import React from 'react'
import { LineChart, Line, Tooltip } from 'recharts'

const Graph = ({ data }) => {
  if (data && !data.error) {
    return (<div className="w-full max-w-screen-lg flex flex-col items-center mt-4">
      <div className="flex justify-around w-full font-semibold py-2 shadow-lg rounded-lg">
      <h1 className=" text-green-400 text-2xl">lowest: {data.lowest} Gwei</h1>
      <h1 style={{ color: '#087e8b'}} className="text-2xl">avg: {data.avg} Gwei</h1>
      <h1  className="text-red-400 text-2xl">highest: {data.highest} Gwei</h1>
      </div>
      <LineChart width={600} height={500} data={data.data}>
        <Tooltip />
        <Line type="monotone" dataKey="gasPrice" stroke="#FB8180"/>
      </LineChart>
    </div>)
  } else if (data && data.error) {
    return (<div className="w-full max-w-screen-lg flex flex-col items-center mt-4">
     <h1 className="pt-6 text-3xl text-green-400 font-medium">Congrats! You didn't spend any gas in the time period! (why u here doe)</h1>
    </div>)
  }
  else {
    return <></>
  }
}

export default Graph