import { useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import DigitalClock from "../DigitalClock";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const [counting, setCounting] = useState(0);
    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });

    function incPerSec() {
        setCounting(s => (s + 1 + 86400) % 86400);
    }

    useEffect(() => {
        intervalId = setInterval(incPerSec, 1000);
        /* BUG: Stop counting when alert, which means setInterval is not safe */
    }, []);
    useEffect(() => {
        setTime({
            hour: counting / 3600,
            minute: counting / 60,
            second: counting % 60
        })
    }, [counting]);


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            { 
                reverse ? 
                <ReverseClock props={{time: time, initTime: initTime, scale: scale}}/> : 
                <BasicClock props={{time: time, initTime: initTime, scale: scale}}/>
            }
            <DigitalClock time={time} scale={scale}/>
        </div>
    )
}