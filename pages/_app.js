import '../styles/global.css';
import { CurrentStateContext, CurrentTimeContext, AlarmTimeContext } from '../contexts/GlobalContext';
import { useState } from 'react';

export default function App({ Component, pageProps}) {
    const [currentState, setCurrentState] = useState('NORMAL');

    /* something goes wrong with Date */
    let d = new Date();
    let initTime = {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds()
    }

    // let initTime = {
    //     hour: 0,
    //     minute: 0,
    //     second: 0
    // }
    const [currentTime, setCurrentTime] = useState(initTime);
    const [alarmTime, setAlarmTime] = useState(initTime);
    const [alarmTitle, setAlarmTitle] = useState("");

    return (
        <>
            <CurrentTimeContext.Provider value={{ currentTime, setCurrentTime }}>
            <CurrentStateContext.Provider value={{ currentState, setCurrentState }}>
            <AlarmTimeContext.Provider value={{ alarmTime, setAlarmTime, alarmTitle, setAlarmTitle }}>
                <Component {...pageProps}/>
            </AlarmTimeContext.Provider>
            </CurrentStateContext.Provider>
            </CurrentTimeContext.Provider>
        </>
    );
}