require('dotenv').config()
const fetch = require('node-fetch')
const express = require('express')
const app = express()
const apiRouter = require('./api')

app.use(express.static('dist'))

app.use('/api', apiRouter)

app.listen(process.env.PORT, () => {
  console.log('Gas trends api listening on port ' + process.env.PORT)
})
