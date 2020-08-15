import React, { useState, useEffect } from 'react';
import Graph from './graph';
import './index.css';
import gaspng from './gas.png';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import { useAnchorEl } from './hooks';
import CircularProgress from '@material-ui/core/CircularProgress';

const API_ENDPOINT = 'http://localhost:3001/api'

const App = () => {
  const [address, setAddress] = useState();
  const [filter, setFilter] = useState('day');
  const [anchorEl, handleClick, handleClose] = useAnchorEl();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  const select = (filter) => {
    setFilter(filter);
    handleClose();
  };

  const connect = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        setAddress(accounts[0]);
      });
  };

  const getData = () => {
    setLoading(true)
    fetch(`${API_ENDPOINT}/gas/${address}?filter=${filter}`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setData(res)
      })
      .catch((e) => {
        setLoading(false)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000)
      })
  };

  //refetch on filter change
  useEffect(() => {
    if (data && address) {
      getData()
    }
  }, [filter])

  return (
    <>
    <div className=' flex flex-col items-center min-h-screen'>
      <div className='flex-1 w-full flex flex-col items-center'>
        <img src={gaspng} height='150' width='150' className='py-10' />
        <h1 className='text-4xl font-semibold pt-10 text-red-400'>
          How much gas price did I pay in the past{' '}
          <Tooltip title='click me!' arrow>
            <button
              className='focus:outline-none hover:font-medium'
              onClick={handleClick}
            >
              {filter}
            </button>
          </Tooltip>{' '}
          ?
        </h1>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem style={{ color: '#FB8180' }} onClick={() => select('day')}>
            day
          </MenuItem>
          <MenuItem style={{ color: '#FB8180' }} onClick={() => select('week')}>
            week
          </MenuItem>
          <MenuItem
            style={{ color: '#FB8180' }}
            onClick={() => select('month')}
          >
            month
          </MenuItem>
        </Menu>
        <Slide direction='up' in={!data} mountOnEnter unmountOnExit timeout={500}>
          <div className='max-w-xl w-full md:w-3/5 flex flex-col items-center mt-8'>
            <input
              className='bg-red-100 appearance-none border-2 border-red-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-red-400 shadow-2xl'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="your address goes here"
            />
            <div>
              <button
                onClick={() => getData()}
                className='bg-red-400 shadow-xl text-white rounded px-4 py-2 focus:outline-none focus:bg-red-200 hover:bg-white hover:border-red-400 hover:text-red-400 mt-10 mx-8'
                disabled={!address}
              >
                grrrrrr
              </button>
              <button
                onClick={() => connect()}
                className='bg-red-400 shadow-xl text-white rounded px-4 py-2 focus:outline-none focus:bg-red-200 hover:bg-white hover:border-red-400 hover:text-red-400 mt-10'
              >
                get address from metamask
              </button>
            </div>
          </div>
        </Slide>
        {
          loading 
            ? <div className="w-full pt-8 flex justify-center text-red-400"><CircularProgress color="inherit" size={50} /></div>
            : error
              ? <h1>Error fetching your gas spendings :( 🍠</h1>
              : data && <Graph data={data} setData={setData} />
        }
      </div>
      <footer className='flex items-center justify-center flex-shrink-0 pb-4'>
        <a
          className='text-red-400 font-medium'
          href='https://github.com/frankisawesome/trendsandgas'
        >
          Github
        </a>
      </footer>
    </div>
    <footer className='flex items-center justify-center text-red-400 font-bold'>
        <p>fuck 🍠</p>
  </footer>
  </>
  );
};

export default App;
