import { useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import DigitalClock from "../DigitalClock";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const [counting, setCounting] = useState(0);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    let time = { hour: hour, minute: minute, second: second };

    function incPerSec() {
        setCounting(s => (s + 1 + 86400) % 86400);
    }

    useEffect(() => {
        intervalId = setInterval(incPerSec, 1000);
        /* BUG: Stop counting when alert, which means setInterval is not safe */
    }, []);


    useEffect(() => {
        setSecond((counting % 60));
    }, [counting])
    useEffect(() => {
        setMinute((counting / 60));
    }, [counting]);

    useEffect(() => {
        setHour((counting / 3600));
    }, [counting]);


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            { 
                reverse ? 
                <ReverseClock props={{time: time, initTime: initTime, scale: scale}}/> : 
                <BasicClock props={{time: time, initTime: initTime, scale: scale}}/>
            }
            <DigitalClock time={time}/>
        </div>
    )
}