import { useContext, useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import DigitalClock from "../DigitalClock";

import { CurrentTimeContext } from "../../contexts/GlobalContext";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const [counting, setCounting] = useState(0);
    const [time, setTime] = useState(initTime);
    const context = useContext(CurrentTimeContext);

    function incPerSec() {
        setCounting(s => (s + 1 + 86400) % 86400);
    }

    useEffect(() => {
        setCounting(time.hour * 3600 + time.minute * 60 + time.second)
        intervalId = setInterval(incPerSec, 1000);
        /* BUG: Stop counting when alert, which means setInterval is not safe */
        return () => {
            clearInterval(intervalId);
        }
    }, []);
    useEffect(() => {
        setTime({
            hour: Math.floor(counting / 3600),
            minute: Math.floor((counting / 60) % 60),
            second: counting % 60
        })
    }, [counting]);

    useEffect(() => {
        // console.log(time)
        context.setCurrentTime(time);
    }, [time]);


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            { 
                reverse ? 
                <ReverseClock props={{time: time, scale: scale}}/> : 
                <BasicClock props={{time: time, scale: scale}}/>
            }
            <DigitalClock time={time} scale={scale}/>
        </div>
    )
}