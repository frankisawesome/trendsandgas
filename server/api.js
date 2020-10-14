const router = require('express').Router()
const axios = require('axios')
const { getBlockInterval, processResults, getEpochInterval, processCoingecko } = require('./services')
const { redisMiddleware1, redisMiddleware2 } = require('./redis')

//historical gas prices for a particular ethereum address
router.get('/gas/:address', redisMiddleware1, async (req, res) => {
  try {
    const address = req.params.address
    const [from, to] = await getBlockInterval(req.query.filter)
    const data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${from}&endblock=${to}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`)
    const result = processResults(data.data.result)
    req.redis.setex(`gas/${address}`, 600, JSON.stringify(result))
    res.send(result)
  } catch (e) {
    console.log(`[ERROR] /api/gas/:address error at ${new Date().toLocaleString()}`)
    console.error(e)
    res.send({ error: true, message: e.message ? e.message : e })
  }
})

//historical ethereum stats (price, market cap and 24h trading volume)
router.get('/eth/stats', redisMiddleware2, async (req, res) => {
  try {
    const [from, to] = getEpochInterval(req.query.filter)
    const data = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${from}&to=${to}`)
    const result = processCoingecko(data.data)
    req.redis.setex(`eth/stats-${req.query.filter}`, 600, JSON.stringify(result))
    res.send(result)
  } catch (e) {
    console.log(`[ERROR] /api/gas/:address error at ${new Date().toLocaleString()}`)
    console.error(e)
    res.send({ error: true, message: e.message ? e.message : e })
  }
})

module.exports = router