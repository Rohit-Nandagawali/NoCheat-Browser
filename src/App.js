import React, { useState, useEffect } from 'react';
import Anime from './assets/anime.json'
import Lottie from 'react-lottie'


function App() {

  const [url, setUrl] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isScreenShareSWDetected, setIsScreenShareSWDetected] = useState(true); // State to track if screen sharing software is detected


  useEffect(() => {
    window.ipcRenderer.send('check-screen-sharing');


    // Listen for the reply from the main process
    window.ipcRenderer.on('screen-sharing-result', (event, isDetected) => {
      setIsScreenShareSWDetected(isDetected)
      console.log('Received message from main process:', isDetected);
    });
  }, [])

  const handleSearch = (e) => {
    window.ipcRenderer.send('open-url-fullscreen', url);

  };



  const handleInputChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    // setAnimationHeight(value ? 5 : 40);.
    setIsTyping(value !== '');
  };


  const options = {
    animationData: Anime, // Your Lottie animation data
    loop: true, // Whether the animation should loop
    autoplay: true,

  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

      <div className="flex flex-col justify-center items-center">
        <h1 className={` mt-4 mb-7 ${isTyping ? `scale-75 -translate-y-5 mt-4 mb-2` : `scale-100`} text-white text-5xl font-Orbitron font-medium  duration-300`}>No Cheat Browser</h1>


        { //if screen sharing software detected 
          isScreenShareSWDetected ?

            <div className=" border border-red-400 text-red-500 px-4 py-3 rounded w-3/5 lg:w-2/5 bg-gray-950" >
              <div className="flex items-center ">
                <div className="h-5 w-5 text-red-400 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="nz sb ayz"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd"></path></svg>
                </div>
                <strong className="font-medium text-xl ms-1">Screen sharing software Detected</strong>
              </div>

              <div className="ms-5 mt-2 text-sm">

                <p > Detected (AnyDesk, TeamViewer,etc.). </p>
                <p> Please close them and reopen this app.</p>
              </div>


            </div>

            : // if screeen sharing software not detected
            <div className="">
              <div className={`${isTyping ? `scale-75 -translate-y-10` : `scale-100`} duration-300`}>
                <Lottie style={{ borderRadius: 10 }} options={options} />
              </div>
              <div className={`${isTyping ? `scale-125 -translate-y-14 ` : `scale-100`}  w-full h-full text-wrap  mt-6 duration-300`}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>

                  <input type="search" id="default-search" className="block w-full p-4  px-6 ps-10 text-sm text-white border border-purple-800 rounded-full bg-[#0C162D] focus:border-purple-800 focus:ring-purple-900 text-wrap pe-[7rem]" onChange={handleInputChange} placeholder="Enter exam link..." required />


                  <button className="text-white absolute end-2.5 bottom-2.5 bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 " onClick={handleSearch}>Start Exam</button>

                </div>
              </div>
            </div>
        }


      </div>

    </div>

  );
}

export default App;
