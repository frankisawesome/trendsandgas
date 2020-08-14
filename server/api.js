const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
  res.send('Gas trends api')
})

router.get('/gas/:address', (req, res) => {
  const address = req.params.address
  fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`)
  .then((res) => res.json())
  .then((res) => console.log(res))
})

module.exports = router