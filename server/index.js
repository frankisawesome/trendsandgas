require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const apiRouter = require('./api')

app.use(cors())

app.use(express.static('dist'))
app.use('/api', apiRouter)

app.listen(process.env.PORT, () => {
  console.log('Gas trends api listening on port ' + process.env.PORT)
})
