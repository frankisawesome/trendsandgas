const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Gas trends api')
})

module.exports = router