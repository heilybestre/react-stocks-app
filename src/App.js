import { useState } from 'react';

import { Dotted, Slice, Featured, List } from './components';
import { dateToUnix } from './utils/datetime';

import './App.css';

// For improvement: create a constant or env file for these
const API = 'https://finnhub.io/api/v1';
const TOKEN = 'cfdsdk9r01qp08ktkkl0cfdsdk9r01qp08ktkklg';

function App() {
  const [symbol, setSymbol] = useState('');
  const [featured, setFeatured] = useState('');
  const [searches, setSearches] = useState([]);

  // For improvement: create useFetch hook and have a separate folder for api calls
  const getStockData = async () => {
    const date = new Date();
    const historyFrom = dateToUnix(new Date(date.getFullYear(), date.getMonth() - 12, 1));
    const historyTo = dateToUnix(new Date(date.getFullYear(), date.getMonth(), 1));

    const profileUrl = `${API}/stock/profile2?symbol=${symbol}&token=${TOKEN}`;
    const quoteUrl = `${API}/quote?symbol=${symbol}&token=${TOKEN}`;    
    const candleUrl = `${API}/stock/candle?symbol=${symbol}&resolution=M&from=${historyFrom}&to=${historyTo}&token=${TOKEN}`;

    const responses = await Promise.all([fetch(profileUrl), fetch(quoteUrl), fetch(candleUrl)]);

    const profile = await responses[0].json();
    const quote = await responses[1].json();
    const candle = await responses[2].json();

    const data = {
      symbol: symbol,
      name: profile.name,
      logo: profile.logo,
      currency: profile.currency,
      price: quote.c,
    }

    setFeatured({
      ...data,
      history: candle,
    });
    setSearches([{ ...data, datetime: Date.now() }, ...searches]);
    setSymbol('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getStockData();
  }

  return (
    <div className='App'>
      <div className='py-16 sm:py-24'>
        <div className='relative sm:py-16'>
          <div aria-hidden='true' className='hidden sm:block'>
            <div className='absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50' />
            <Dotted />
          </div>
          <div className='mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8'>
            <div className='relative overflow-hidden rounded-2xl bg-violet-700 px-6 py-10 shadow-xl sm:px-12 sm:py-20'>
              <div
                aria-hidden='true'
                className='absolute inset-0 -mt-72 sm:-mt-32 md:mt-0'
              >
                <Slice />
              </div>
              <div className='relative'>
                <div className='sm:text-center'>
                  <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                    react-stock-app
                  </h2>
                  <p className='mx-auto mt-6 max-w-2xl text-lg text-violet-200'>
                    Search stock data by inputting the ticker
                    symbol
                  </p>
                </div>
                <form
                  className='mt-12 sm:mx-auto sm:flex sm:max-w-lg'
                  onSubmit={handleSubmit}
                >
                  <div className='min-w-0 flex-1'>
                    <label
                      htmlFor='cta-symbol'
                      className='sr-only'
                    >
                      Ticker symbol
                    </label>
                    <input
                      id='cta-symbol'
                      type='text'
                      className='block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-600'
                      placeholder='Enter ticker symbol (e.g. AAPL)'
                      value={symbol}
                      onChange={(e) =>
                        setSymbol(e.target.value)
                      }
                    />
                  </div>
                  <div className='mt-4 sm:mt-0 sm:ml-3'>
                    <button
                      type='submit'
                      className='block w-full rounded-md border border-transparent bg-violet-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-600 sm:px-10'
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Featured item={featured} />
        <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8 py-20">
          <div className="border-b border-gray-200 pb-5">
            <h3 className="text-base font-semibold text-gray-500 text-left">Recent searches</h3>
          </div>
          <List items={searches} />
        </div>

      </div>
    </div>
  );
}

export default App;
