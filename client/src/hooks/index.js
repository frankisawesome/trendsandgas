import { useState, useEffect } from 'react'
require('dotenv').config()

//use local backend in development environment -> use env variable in prod
const API_ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api' : process.env.API_ENDPOINT

//fetches gas price paid on a transactional basis based on address and date rage
export const useGasPerAddress = (address, filter) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  
  const getData = () => {
    setLoading(true)
    //use user's address or the chainlink eth/usd aggregator
    //TODO: use more than just one address to better represent network gas prices
    fetch(`${API_ENDPOINT}/gas/${address || '0xF79D6aFBb6dA890132F9D7c355e3015f15F3406F'}?filter=${filter}`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setData(res)
      })
      .catch((e) => {
        //clear error in 3 seconds
        setLoading(false)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000)
      })
  };

  //refetch on filter/address change
  useEffect(() => {
    getData()
  }, [filter, address])

  return [data, loading, error]
}

//use ethereum statistics for graphing (price market cap or 24h volume)
export const useEthStatistics = (type) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  const getData = () => {
    setLoading(true)
    fetch(`${API_ENDPOINT}/eth/stats?filter=${filter}`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setData(res)
      })
      .catch((e) => {
        //clear error in 3 seconds
        setLoading(false)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000)
      })
  };

   //refetch on filter/address change
   useEffect(() => {
    getData()
  }, [type])

  return [data, loading, error]
}