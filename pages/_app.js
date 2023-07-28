import { CurrentStateContext,CurrentStyleContext, CurrentTimeContext, AlarmTimeContext } from '../contexts/GlobalContext';
import { useState } from 'react';
import '../styles/global.css';

export default function App({ Component, pageProps}) {
    const [currentState, setCurrentState] = useState('NORMAL');
    const [currentStyle, setCurrentStyle] = useState('BASIC');

    /* something goes wrong with Date */
    let d = new Date();
    let initTime = {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds()
    }

    const [currentTime, setCurrentTime] = useState(initTime);
    const [alarmTime, setAlarmTime] = useState(initTime);
    const [alarmTitle, setAlarmTitle] = useState("");

    return (
        <>
            <CurrentTimeContext.Provider value={{ currentTime, setCurrentTime }}>
            <CurrentStyleContext.Provider value={{ currentStyle, setCurrentStyle }}>
            <CurrentStateContext.Provider value={{ currentState, setCurrentState }}>
            <AlarmTimeContext.Provider value={{ alarmTime, setAlarmTime, alarmTitle, setAlarmTitle }}>
                <Component {...pageProps}/>
            </AlarmTimeContext.Provider>
            </CurrentStateContext.Provider>
            </CurrentStyleContext.Provider>
            </CurrentTimeContext.Provider>
        </>
    );
}