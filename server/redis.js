//redis layer middlewares (caching)
const redisMiddlewareGas = (req, res, next) => {
  const address = req.params.address
  req.redis.get(`gas/${address}-${req.query.filter}`, (err, result) => {
    //log errors with redis client
    if (err) {
      console.log(`[ERROR] Redis get error: ${err}`)
    }
    //go to next middleware and log cache missed 
    else if (!result) {
      console.log(`[INFO] Cache missed on route /gas/${address}`)
      next()
    } 
    //if cache hit return cached result
    else {
      console.log(`[INFO] Cache hit on route /gas/${address}`)
      res.send(JSON.parse(result))
    }
  })
}

const redisMiddlewareStats = (req, res, next) => {
  req.redis.get(`eth/stats-${req.query.filter}`, (err, result) => {
    //log errors with redis client
    if (err) {
      console.log(`[ERROR] Redis get error: ${err}`)
    }
    //go to next middleware and log cache missed 
    else if (!result) {
      console.log(`[INFO] Cache missed on route /eth/stats`)
      next()
    } 
    //if cache hit return cached result
    else {
      console.log(`[INFO] Cache hit on route /eth/stats`)
      res.send(JSON.parse(result))
    }
  })
}

module.exports = { redisMiddlewareGas, redisMiddlewareStats }