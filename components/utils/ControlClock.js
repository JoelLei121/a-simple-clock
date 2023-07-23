import { useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import DigitalClock from "../DigitalClock";

var intervalId;
export default function ControlClock({ 
    reverse = false, 
    initTime = { hour: 0, minute: 0, second: 0}, 
    time = { hour: 0, minute: 0, second: 0 }, 
    scale = 1 
}) {
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