import { useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    let time = { hour: hour, minute: minute, second: second };

    function incPerSec() {
        setSecond(s => (s + 1 + 86400) % 86400);
    }

    useEffect(() => {
        intervalId = setInterval(incPerSec, 1000);
        /* BUG: Stop counting when alert, which means setInterval is not safe */
    }, []);

    useEffect(() => {
        setMinute((second / 60));
    }, [second]);

    useEffect(() => {
        setHour((second / 3600));
    }, [second]);


    return (
        <>
            { 
                reverse ? 
                <ReverseClock props={{time: time, initTime: initTime, scale: scale}}/> : 
                <BasicClock props={{time: time, initTime: initTime, scale: scale}}/>
            }
        </>
    )
}