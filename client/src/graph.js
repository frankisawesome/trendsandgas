import React from 'react'
import { LineChart, Line } from 'recharts'

const Graph = ({ data }) => {
  if (data) {
    return (<div className="w-full max-w-screen-lg flex flex-col items-center mt-4">
      <div className="flex justify-around w-full font-semibold py-2 shadow-lg rounded-lg">
      <h1 className=" text-green-400 text-2xl">lowest: 180 Gwei</h1>
      <h1 style={{ color: '#087e8b'}} className="text-2xl">avg: 210 Gwei</h1>
      <h1  className="text-red-400 text-2xl">highest: 240 Gwei</h1>
      </div>
      <LineChart width={600} height={500} data={data}>
        <Line type="monotone" dataKey="gas_price" stroke="#FB8180"/>
      </LineChart>
    </div>)
  } else {
    return <></>
  }
}

export default Graph