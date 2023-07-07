import React, { useState } from 'react'


import { WebsiteCarbonCalculator, WebsiteCarbonCalculatorError } from 'website-carbon-calculator';


const Home = () => {
    const[userURL, setUserURL] = useState('');
    const [showres, setShowres] = useState('false')
    const[btf,setBtf]=useState('');
    const[love, setLove] = useState(false);
    const[load, setLoad] = useState(false);
    const[greenH, setGreenH] = useState('');
    const[co2ppv, setCo2ppv] = useState('');
    var websiteCarbonCalculator;
    
    const helper = async () => {
        try {
            setLoad(true);
            
            const key = process.env.REACT_APP_GOOGLE_PAGESPEED_API_KEY;
            
            console.log("key");
            console.log(key);
            console.log("hhe");
            websiteCarbonCalculator = new WebsiteCarbonCalculator({
              pagespeedApiKey: process.env.REACT_APP_GOOGLE_PAGESPEED_API_KEY,
              });
              setLoad(true);
              console.log(userURL);
              const result = await websiteCarbonCalculator.calculateByURL(userURL)
              setGreenH(result.isGreenHost);
              setBtf(result.bytesTransferred);
              setCo2ppv(result.co2PerPageview);
              setShowres(true)
              setLoad(false);
          } catch(error) {
            if(error instanceof WebsiteCarbonCalculatorError){
              console.warn(error.message);
            }
            // Do something else...
          }
      }


  return (
    <div className='w-1/2 mx-auto mt-6'>
<h1>hello enter a url e.g. "https://www.radix-ui.com/" and then click the "click me" button and see</h1>
    <form>
  <label
    htmlFor="default-search"
    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Search
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="search"
      value={userURL}
      onChange={(e) => setUserURL(e.target.value)}
      id="default-search"
      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search Mockups, Logos..."
      required=""
    />
    
  </div>
</form>




    
    <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={helper}>{load ? "wait..." : "click me"}</button>
    
    {
        showres == true &&
        <div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">This is your Result</h2>
        <ul className="max-w-md mx-auto space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li>
                Is your website green hosted? : {greenH ? "yep" :"nah"}
            </li>
            <li>
            Bytes Transferred :{btf}
            </li>
            <li>
                Co2 Per Page View : {co2ppv}
            </li>
        </ul>

        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {setLove(true)}}>click me to know a fact</button>


        {
            love == true &&
            <h1>Enjae loves Anmol</h1>
        }
        
        </div>
    }

    </div>
  )
}

export default Home