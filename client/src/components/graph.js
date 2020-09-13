import React from 'react'
import { LineChart, Line, Tooltip, YAxis, XAxis, ResponsiveContainer } from 'recharts'
import { useGasPerAddress, useEthStatistics } from '../hooks';
import { CircularProgress } from '@material-ui/core';
import { processDataSets } from '../utils';

const Graph = ({ address, dateRange, metricTwo }) => {
  //object key for metric 2
  const metric = metricTwo === 'Ethereum price' ? 'prices' : metricTwo === 'Ethereum market cap' ? 'market_caps' : 'total_volumes'
  //api data states
  const [dataOne, loadingOne, errorOne] = useGasPerAddress(address, dateRange)
  const [dataTwo, loadingTwo, errorTwo] = useEthStatistics(dateRange)

  const data = (dataOne && dataTwo) ? processDataSets(dataOne.data, dataTwo[metric]) : []

  const tooltip = (v, n, p) => {
    if (n === 'gasPrice') {
      return [parseFloat(v).toFixed(3), 'Snapshot Gas Price', null];
    } else if (n === 'metric2') {
      return [parseFloat(v).toFixed(3), 'Snapshot ' + metricTwo, p];
    } else {
      return [parseFloat(v).toFixed(3), n, p];
    }
  };

  const formatter = (epoch) => {
    const date = new Date(0);
    date.setUTCSeconds(epoch);
    return date.toLocaleString();
  };

  return (<>
    {(loadingOne || loadingTwo && !errorOne && !errorTwo) && <div className="w-full pt-8 flex justify-center text-red-400"><CircularProgress color="inherit" size={50} /></div>}
    {(errorOne || errorTwo) && <h1>Error loading data</h1>}

    {dataOne && dataTwo && <div className="w-full max-w-screen-lg flex flex-col items-center mt-4">
      <div className="flex justify-around w-full font-semibold py-2 shadow-lg rounded-lg mb-4">
      <h1 className=" text-green-400 text-2xl">lowest: {parseFloat(dataOne.lowest).toFixed(3)} Gwei</h1>
      <h1 style={{ color: '#087e8b'}} className="text-2xl">avg: {parseFloat(dataOne.avg).toFixed(3)} Gwei</h1>
      <h1  className="text-red-400 text-2xl">highest: {parseFloat(dataOne.highest).toFixed(3)} Gwei</h1>
      </div>
      <ResponsiveContainer width='90%' height={500}>
        <LineChart data={data}>
          <Tooltip formatter={tooltip} labelFormatter={formatter}/>
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <XAxis dataKey="timestamp" tickFormatter={formatter}/>
          <Line type="monotone" yAxisId="left" dataKey="gasPrice" stroke="#FB8180" dot={false}/>
          <Line type="monotone" yAxisId="right" dataKey="metric2" stroke="#68D391" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>}
  </>)
}


export default Graph