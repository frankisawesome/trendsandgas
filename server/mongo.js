//mongo layer middlewares (persistence)
const mongoMiddlewareGas = (req, res, next) => {
  const key = `gas/${req.params.address}-${req.query.filter}`
  req.mongo.db('cab432').collection('results').findOne({ id: key }, (err, data) => {
    if (data) {
      console.log(`[INFO] MongoDB hit for query ${key}`)
      req.redis.setex(key, 600, JSON.stringify(data.data))
      res.send(data.data)
    } else {
      console.log(`[INFO] MongoDB missed for query ${key}`)
      next()
    }
  })
}

const mongoMiddlewareStats = (req, res, next) => {
  const key = `eth/stats-${req.query.filter}`
  req.mongo.db('cab432').collection('results').findOne({ id: key }, (err, data) => {
    if (data) {
      console.log(`[INFO] MongoDB hit for query ${key}`)
      req.redis.setex(key, 600, JSON.stringify(data.data))
      res.send(data.data)
    } else {
      console.log(`[INFO] MongoDB missed for query ${key}`)
      next()
    }
  })
}

module.exports = { mongoMiddlewareGas, mongoMiddlewareStats }