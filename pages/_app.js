import '../styles/global.css';
// import { SampleContext } from '../contexts/SampleContext';
import { CurrentStateContext, CurrentTimeContext  } from '../contexts/GlobalContext';
import { useState } from 'react';

export default function App({ Component, pageProps}) {
    const [currentState, setCurrentState] = useState('NORMAL');
    // get time from Date
    let d = new Date();
    let initTime = {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds()
    }
    // console.log(initTime)
    const [currentTime, setCurrentTime] = useState(initTime);

    return (
        <>
            <CurrentTimeContext.Provider value={{ currentTime, setCurrentTime }}>
            <CurrentStateContext.Provider value={{ currentState, setCurrentState }}>
                <Component {...pageProps}/>
            </CurrentStateContext.Provider>
            </CurrentTimeContext.Provider>
        </>
    );
}