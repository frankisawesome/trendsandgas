
//process two sets of time series data from coingecko and etherscan
export function processDataSets(data1, data2) {
  //first up we find the min and max dates from data1 (etherscan data), which in some cases have a narrower range than data2
  let from = Infinity
  let to = 0

  //if data set 1 is valid
  if (Array.isArray(data1)) {
    data1.forEach((datapoint) => {
      if (parseInt(datapoint.timestamp) < from) {
        from = parseInt(datapoint.timestamp)
      }
      if (parseInt(datapoint.timestamp) > to) {
        to = parseInt(datapoint.timestamp)
      }
    })

    //then we cap data2 to within the data range
    data2.filter((datapoint) => datapoint.timestamp <= to && datapoint.timestamp >= from)
  }


  //now we downsample one of the datasets to get the same number of datapoints on the two data sets and merge them in
  //determine lowest data count
  const lowest = data1 ? ((data1.length > data2.length) ? data2.length : data1.length) : 21

  //aim for 20 snapshots if both datasets have more than 20 datapoints
  const snapshot_count = lowest > 20 ? 20 : lowest

  //determine timestamp cutoffs for our snapshots
  const timestamps = []
  const diff = parseInt(to) - parseInt(from)
  for (let i = 0; i <= snapshot_count; i++) {
    timestamps.push(from + (i * diff / snapshot_count))
  }

  //aggregate the datasets
  const results = timestamps.map((snapshot_timestamp) => {
    //results object
    const result = { timestamp: snapshot_timestamp }

    //loop through data set 1 to find the latest datapoint before timestamp
    let data1_latest = { timestamp: 0 }
    let data2_latest = { timestamp: 0 }
    if (Array.isArray(data1)) {
      data1.forEach((datapoint) => {
        if ((datapoint.timestamp) > data1_latest.timestamp && datapoint.timestamp < snapshot_timestamp) {
          data1_latest = datapoint
        }
      })
    }
    data2.forEach((datapoint) => {
      if (datapoint.timestamp > data2_latest.timestamp && datapoint.timestamp < snapshot_timestamp) {
        data2_latest = datapoint
      }
    })

    //use latest data for the result data point
    result['gasPrice'] = data1_latest.gasPrice || 0
    result['metric2'] = data2_latest.metric2 || 0

    return result
  })
  //drop first 0 entry
  results.shift()
  
  return results
}