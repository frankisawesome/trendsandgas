require('dotenv').config()
const fetch = require('node-fetch')
const googleTrends = require('google-trends-api')

fetch(`https://ethgasstation.info/api/ethgasAPI.json?api-key=${process.env.GAS_API_KEY}`)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((e) => console.error(e))


googleTrends.interestOverTime({keyword: 'defi', startTime: new Date('2020-08-11'), endTime: new Date('2020-08-13'), granularTimeResolution: true})
.then(function(results){
  console.log('These results are awesome', results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});