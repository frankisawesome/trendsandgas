//very minimal express app here tailored per front end requirements
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const apiRouter = require('./api')

//mongo db client
const mongoClient = require('mongodb').MongoClient
const db = new mongoClient(process.env.MONGO_URL, { useNewUrlParser: true })

app.use(cors())

app.use(express.static('dist'))
app.use('/api', apiRouter)

//got pinged by bots on root and php-myadmin (?) during the short time I had this deployed - hopefully returning 404 can stop them
app.get('/', (req, res) => {
  res.status(404)
  res.send({ error: true, message: 'Nothing to see here'})
})

app.get('/php-myadmin', (req, res) => {
  res.status(404)
  res.send({ error: true, message: 'Nothing to see here'})
})

app.listen(process.env.PORT, () => {
  console.log('[INFO] [EXPRESS ROOT] Gas trends api listening on port ' + process.env.PORT)
})

//TODO: Log crashes using slack api - POST ASSESSMENT
