const router = require('express').Router()
const axios = require('axios')
const { getBlockInterval, processResults, getEpochInterval, processCoingecko } = require('./services')
const { redisMiddlewareGas, redisMiddlewareStats } = require('./redis')
const { mongoMiddlewareGas, mongoMiddlewareStats } = require('./mongo')


//historical gas prices for a particular ethereum address
router.get('/gas/:address', redisMiddlewareGas, mongoMiddlewareGas, async (req, res) => {
  try {
    //get data from services
    const address = req.params.address
    const [from, to] = await getBlockInterval(req.query.filter)
    const data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${from}&endblock=${to}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`)
    const result = processResults(data.data.result)

    //store/refresh cache and db
    const key = `gas/${address}-${req.query.filter}`
    req.redis.setex(key, 600, JSON.stringify(result))
    req.mongo.db('cab432').collection('results').insertOne({
      id: key,
      data: result,
      timestamp: Date.now()
    })

    res.send(result)
  } catch (e) {
    console.log(`[ERROR] /api/gas/:address error at ${new Date().toLocaleString()}`)
    console.error(e)
    res.send({ error: true, message: e.message ? e.message : e })
  }
})

//historical ethereum stats (price, market cap and 24h trading volume)
router.get('/eth/stats', redisMiddlewareStats, mongoMiddlewareStats, async (req, res) => {
  try {
    //get data from services
    const [from, to] = getEpochInterval(req.query.filter)
    const data = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${from}&to=${to}`)
    const result = processCoingecko(data.data)

    //store data in cache and db
    const key = `eth/stats-${req.query.filter}`
    req.redis.setex(key, 600, JSON.stringify(result))
    req.mongo.db('cab432').collection('results').insertOne({
      id: key,
      data: result,
      timestamp: Date.now()
    })

    res.send(result)
  } catch (e) {
    console.log(`[ERROR] /api/gas/:address error at ${new Date().toLocaleString()}`)
    console.error(e)
    res.send({ error: true, message: e.message ? e.message : e })
  }
})

module.exports = router