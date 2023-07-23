import '../styles/global.css';
// import { SampleContext } from '../contexts/SampleContext';
import { CurrentStateContext  } from '../contexts/GlobalContext';
import { useState } from 'react';

export default function App({ Component, pageProps}) {
    const [currentState, setCurrentState] = useState('NORMAL');

    return (
        <>
            <CurrentStateContext.Provider value={{ currentState, setCurrentState }}>
                <Component {...pageProps}/>
            </CurrentStateContext.Provider>
        </>
    );
}