const axios = require('axios')

module.exports = { getEpochInterval, getBlockInterval, processResults, processCoingecko }

//multiplier applied on gwei for transactions
const GWEI_MULTIPLIER = 1000000000

//get epoch from and to from a filter string
function getEpochInterval(filter) {
  const to = new Date()
  let from = new Date()
  if (filter === 'week') {
    from.setDate(from.getDate() - 7)
  } else if (filter === 'month') {
    from.setDate(from.getDate() - 30)
  } else if (filter === '3 months') {
    from.setDate(from.getDate() - 90)
  } else {
    throw { error: 'true', message: 'incorrect filter'}
  }

  console.log([from, to])
  //milliseconds to seconds
  return [parseInt(from / 1000), parseInt(to / 1000)]
}

//get block numbers for intervals (day/week/month)
async function getBlockInterval(filter) {
  const to = new Date()
  //get latest block
  const data = await axios.get(`https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${parseInt(to.getTime() / 1000)}&closest=before&apikey=${process.env.ETHERSCAN_KEY}`)
  const latestBlock = data.data.result
  let from = new Date()
  if (filter === 'week') {
    from.setDate(from.getDate() - 7)
  } else if (filter === 'month') {
    from.setDate(from.getDate() - 30)
  } else if (filter === '3 months') {
    from.setDate(from.getDate() - 90)
  } else {
    throw { error: 'true', message: 'incorrect filter'}
  }
  //get starting block
  const fromdata = await axios.get(`https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${parseInt(from.getTime() / 1000)}&closest=before&apikey=${process.env.ETHERSCAN_KEY}`)
  const fromBlock = fromdata.data.result

  return [fromBlock, latestBlock]
}

//takes an array of transactions data from etherscan api and return in our desired format
function processResults(results) {
  //process this on the front end - no transactions made in the time period
  if (results.length === 0) {
    return {
      data: null,
      error: true,
      message: 'No results'
    }
  }
  //loop through the results, find points of interests as well as pushing the price points into a new array
  const data = []
  let sum = 0, lowest = Infinity
  let highest = 0
  results.forEach((transaction) => {
    const gasPrice = parseInt(transaction.gasPrice / GWEI_MULTIPLIER)
    sum += gasPrice
    if (gasPrice < lowest) {
      lowest = gasPrice
    }
    if (gasPrice > highest) {
      highest = gasPrice
    }
    //wrap the gas price in an object to suit recharts data shape requirement
    data.push({ gasPrice, timestamp: parseInt(transaction.timeStamp) })
  })
  //return the data with the correct multiplier applied
  return {
    data: data,
    avg: sum / results.length,
    lowest: lowest,
    highest: highest
  }
}

//refactors coingecko data -> mainly refactoring the array of individual datapoints into objects of shape { timestamp: 12345, metric2: 111 }
function processCoingecko (data) {
  const res = {}
  Object.keys(data).forEach((key) => {
    const dataset = data[key].map((datapoint) => {
      return {
        timestamp: parseInt(datapoint[0] / 1000) || 0,
        metric2: datapoint[1] || 0
      }
    })
    res[key] = dataset
  })

  return res
}