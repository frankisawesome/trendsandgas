import React, { useState, useEffect } from 'react';
import './index.css';
import gasIcon from './resources/gas.png'
import MetricsSelect from './components/select'
import Graph from './components/graph';

//App handles a couple things here: layout with a bunch of flex containers, states for the drop downs, also uses a custom hook to handle lazy loading data as soon as dropdowns are selected
const App = () => {
  //user states
  const [metricOne, setMetricOne] = useState('Your gas prices paid')
  const [metricTwo, setMetricTwo] = useState('Ethereum price')
  const [dateRange, setDateRange] = useState('week');
  const [address, setAddress] = useState(null);

  //draw graph
  const [graph, setGraph] = useState(false)

  //clean up address state
  useEffect(() => {
    if (metricOne === 'Network gas prices') {
      setAddress(null)
    }
  }, [metricOne])

  //connects to metamask (and other supported browser wallets)
  const connect = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        setAddress(accounts[0]);
      });
  };

  return (
    <>
      {/* body outter container -> full width min height screen to push footer down*/}
      <div className='flex flex-col items-center min-h-screen'>
        {/* body inner container -> max witdth 1280 px, column centering all elements */}
        <div className='flex-1 w-full flex flex-col items-center max-w-screen-lg pt-4'>

          {/* body row 1 -> header */}
          <header className='flex space-x-4 items-center'>
            <img src={gasIcon} alt='little gas station icon' className='h-12 w-12' />
            <h4 className='font-medium text-red-500'>Analyse Ethereum Gas Price</h4>
          </header>

          {/* body row 3 -> double select */}
          <MetricsSelect {... { metricOne, setMetricOne, metricTwo, setMetricTwo, dateRange, setDateRange }} />

          {/* body row 4 -> optional input and big go button */}
          {metricOne === 'Your gas prices paid' && <input
            className='bg-red-100 appearance-none border-2 border-red-200 rounded w-3/4 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-red-400 shadow-2xl my-4'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onClick={connect}
            placeholder="your ethereum address (click to connect)"
          />}
          <button
            onClick={() => setGraph(prev => !prev)}
            className='bg-red-400 shadow-xl text-white rounded px-4 py-2 focus:outline-none focus:bg-red-200 hover:bg-white hover:border-red-400 hover:text-red-400 my-4'
          >
            {graph ? 'Start new graph' : 'Visualise data'}
          </button>

          {/* body row 5 -> graph */}
          {graph && <Graph { ...{ address, metricTwo, dateRange } }/>}


        </div>

        {/* inner footer  TODO: TARGET REPO POST ASSESSMENT */}
        <footer className='flex items-center justify-center flex-shrink-0 pb-4'>
          <a
            className='text-red-400 font-medium'
            href='https://github.com/frankisawesome'
          >
            Github
          </a>
        </footer>
      </div>
      {/* outter footer always need scrolling */}
      {/* TODO: ADD DONATE BUTTON POST ASSESSMENT*/}
      <footer className='flex items-center justify-center text-red-400 font-bold'>
        <p>tip me</p>
      </footer>
    </>
  );
};

export default App;
