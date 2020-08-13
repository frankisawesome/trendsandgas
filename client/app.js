import React, { useState } from 'react'
import Graph from './graph'
import './index.css'

const App = () => {
  const [address, setAddress] = useState()
  const [data, setData] = useState()

  const connect = () => {
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      setAddress(accounts[0])
    })
  }

  const getData = () => {
    setData(dummy)
  }

  const dummy = [
    { gas_price: 79 },
    { gas_price: 100 },
    { gas_price: 90 },
    { gas_price: 137 },
    { gas_price: 168 },
    { gas_price: 201 },
  ]

  return (<div className="w-full flex flex-col items-center">
    <h1 className="text-4xl font-semibold py-10 text-red-400">How much gas did I pay?</h1>
    <div className="max-w-xl w-full md:w-3/5 flex flex-col items-center mt-10">
      <input 
      className="bg-red-100 appearance-none border-2 border-red-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-red-400 shadow-2xl" 
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      />
      <div>
        <button onClick={() => getData()}className="bg-red-400 shadow-xl text-white rounded px-4 py-2 focus:outline-none focus:bg-red-200 hover:bg-white hover:border-red-400 hover:text-red-400 mt-10 mx-6">gaaaas?</button>
        <button onClick={() => connect()} className="bg-red-400 shadow-xl text-white rounded px-4 py-2 focus:outline-none focus:bg-red-200 hover:bg-white hover:border-red-400 hover:text-red-400 mt-10">get address from metamask</button>
      </div>
    </div>
    <Graph data={data}/>
  </div>)
}

export default App