//very minimal express app here tailored per front end requirements
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const apiRouter = require('./api')

//mongo db client
const mongoClient = require('mongodb').MongoClient

let c

mongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, function(err, client) {
  if (!err) {
    c = client
    console.log("[INFO] MongoDB connection successfull");
  } else {
    console.log("[ERROR] Error connecting to mongodb: " + err)
  }
  
});

//redis cache
const redis = require('redis')
const redisClient = redis.createClient({
    host: process.env.REDIS_URL
})
redisClient.on('error', (err) => {
    console.log(`[ERROR] COR BACKEND - Redis Error: ${err}`)
})

app.use(cors())

//attach mongo and redis client to the req object
app.use((req, res, next) => {
  req.redis = redisClient
  req.mongo = c
  next()
})

app.use(express.static('dist'))
app.use('/api', apiRouter)

app.listen(process.env.PORT, () => {
  console.log('[INFO] [EXPRESS ROOT] Gas trends api listening on port ' + process.env.PORT)
})

//TODO: Log crashes using slack api - POST ASSESSMENT
