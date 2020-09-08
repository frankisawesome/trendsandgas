import { useState, useEffect } from 'react'
require('dotenv').config()

//get api endpoint based on node env
const API_ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api' : process.env.API_ENDPOINT

//take some of the messy logic of material ui menu away
export const useAnchorEl = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return [anchorEl, handleClick, handleClose]
}

//fetches gas price paid on a transactional basis based on address and date rage
export const useGasPerAddress = (address, filter) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  
  const getData = () => {
    setLoading(true)
    fetch(`${API_ENDPOINT}/gas/${address}?filter=${filter}`)
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