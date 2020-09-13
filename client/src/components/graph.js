import React from 'react'
import { LineChart, Line, Tooltip, YAxis, XAxis } from 'recharts'
import { useGasPerAddress, useEthStatistics } from '../hooks';
import { CircularProgress } from '@material-ui/core';
import { processDataSets } from '../utils';

const Graph = ({ address, dateRange, metricTwo }) => {
  //object key for metric 2
  const metric = metricTwo === 'Ethereum price' ? 'prices' : metricTwo === 'Ethereum market cap' ? 'market_caps' : 'total_volumes'
  //api data states
  const [dataOne, loadingOne, errorOne] = useGasPerAddress(address, dateRange)
  const [dataTwo, loadingTwo, errorTwo] = useEthStatistics(dateRange)

  const data = (dataOne && dataTwo) ? processDataSets(dataOne, dataTwo[metric]) : []

  return (<>
    {(loadingOne || loadingTwo && !errorOne && !errorTwo) && <div className="w-full pt-8 flex justify-center text-red-400"><CircularProgress color="inherit" size={50} /></div>}
    {(errorOne || errorTwo) && <h1>Error loading data</h1>}

    {dataOne && dataTwo && <div className="w-full max-w-screen-lg flex flex-col items-center mt-4">
      <div className="flex justify-around w-full font-semibold py-2 shadow-lg rounded-lg">
      <h1 className=" text-green-400 text-2xl">lowest: {dataOne.lowest} Gwei</h1>
      <h1 style={{ color: '#087e8b'}} className="text-2xl">avg: {dataOne.avg} Gwei</h1>
      <h1  className="text-red-400 text-2xl">highest: {dataOne.highest} Gwei</h1>
      </div>
      <LineChart width={600} height={500} data={data}>
        <Tooltip />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <XAxis />
        <Line type="monotone" yAxisId="left" dataKey="gasPrice" stroke="#FB8180" dot={false}/>
        <Line type="monotone" yAxisId="right" dataKey="metric2" stroke="#68D391" dot={false} />
      </LineChart>
    </div>}
  </>)
}


export default Graph