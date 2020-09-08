import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [filter, setFilter] = useState('day');
  const [address, setAddress] = useState();

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
      <div className=' flex flex-col items-center min-h-screen'>
        {/* body inner container -> max witdth 1280 px, column centering all elements */}
        <div className='flex-1 w-full flex flex-col items-center max-w-screen-lg pt-4'>

          {/* body row 1 -> header */}
          <header>
            <h1 className=''>Analyse Ethereum Gas Price</h1>
          </header>

          {/* body row 2 -> double select */}


          {/* body row 3 -> graph */}

        </div>

        {/* inner footer  TODO: TARGET REPO AFTER ASSIGNMENT */}
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
      <footer className='flex items-center justify-center text-red-400 font-bold'>
          <p>duck 🍠</p>
      </footer>
    </>
  );
};

export default App;
