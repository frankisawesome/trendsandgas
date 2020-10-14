//very minimal express app here tailored per front end requirements
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const apiRouter = require('./api')

//redis cache
const redis = require('redis')

const redisClient = redis.createClient({
    host: process.env.REDIS_URL
})
  
redisClient.on('error', (err) => {
    console.log(`[ERROR] COR BACKEND - Redis Error: ${err}`)
})

app.use((req, res, next) => {
  req.redis = redisClient
  next()
})

app.use(cors())

app.use(express.static('dist'))
app.use('/api', apiRouter)

app.listen(process.env.PORT, () => {
  console.log('[INFO] [EXPRESS ROOT] Gas trends api listening on port ' + process.env.PORT)
})

//TODO: Log crashes using slack api - POST ASSESSMENT
