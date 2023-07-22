import '../styles/global.css';
// import { SampleContext } from '../contexts/SampleContext';
import { CurrentTimeContext  } from '../contexts/CurrentTimeContext';
import { useState } from 'react';

export default function App({ Component, pageProps}) {
    const [sampleData, setSampleData] = useState({
        message: 'Hello, world!'
    });
    const [currentTime, setCurrentTime] = useState({ hour: 0, minute: 0, second: 0 })

    return (
        <>
            <CurrentTimeContext.Provider value={{ currentTime, setCurrentTime }}>
                {/* <SampleContext.Provider value={{ sampleData, setSampleData }}> */}
                <Component {...pageProps}/>
                {/* </SampleContext.Provider> */}
            </CurrentTimeContext.Provider>
        </>
    );
}