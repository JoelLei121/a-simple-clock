import '../styles/global.css';
import { SampleContext } from '../contexts/SampleContext';
import { useState } from 'react';

export default function App({ Component, pageProps}) {
    const [sampleData, setSampleData] = useState({
        message: 'Hello, world!'
    });

    return (
        <>
            <SampleContext.Provider value={{ sampleData, setSampleData }}>
                <Component {...pageProps}/>
            </SampleContext.Provider>
        </>
    );
}