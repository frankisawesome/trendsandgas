const axios = require('axios')

module.exports = { getBlockInterval }

//get block numbers for intervals (day/week/month)
async function getBlockInterval(filter) {
  const to = new Date()
  const data = await axios.get(`https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${parseInt(to.getTime() / 1000)}&closest=before&apikey=${process.env.ETHERSCAN_KEY}`)
  const latestBlock = data.data.result
  let from = new Date()
  if (filter === 'day') {
    from.setDate(from.getDate() - 1)
  } else if (filter === 'week') {
    from.setDate(from.getDate() - 7)
  } else if (filter === 'month') {
    from.setDate(from.getDate() - 30)
  } else {
    throw { error: 'true', message: 'incorrect filter'}
  }
  const fromdata = await axios.get(`https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${parseInt(from.getTime() / 1000)}&closest=before&apikey=${process.env.ETHERSCAN_KEY}`)
  const fromBlock = fromdata.data.result

  return [fromBlock, latestBlock]
}