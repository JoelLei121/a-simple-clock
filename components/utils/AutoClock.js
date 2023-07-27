import { useContext, useEffect, useState, useRef } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import ChangeClock from "./ChangeClock";
import DigitalClock from "../DigitalClock";

import { CurrentTimeContext } from "../../contexts/GlobalContext";
import { CurrentStateContext } from "../../contexts/GlobalContext";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const initStamp=useRef(timeToStamp(initTime))
    const stakeStamp=useRef(Math.floor(performance.now()))
    const [timeStamp, setTimeStamp] = useState(0);

    function stampToTime(stamp){
        return {hour:stamp/3600000,minute:stamp%3600000/60000,second:stamp%60000/1000}
    }
  
    function timeToStamp(time){
        return Math.floor(Math.floor(time.hour)*3600000+Math.floor(time.minute)*60000+time.second*1000);
    }

    function updateTimeStamp(){
        let now = Math.floor(performance.now());
        let stamp = (now - stakeStamp.current+ initStamp.current)%86400000;
        setTimeStamp(stamp);
    }

    useEffect(() => {
        intervalId = setInterval(updateTimeStamp,30);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        let stampSecond=Math.floor(timeStamp/1000);
        let time={hour: Math.floor(stampSecond/3600), minute: Math.floor(stampSecond/60)%60, second: stampSecond%60};
        timeContext.setCurrentTime(time);
    }, [timeStamp]);


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", filter: showChange?"blur(10px)":"none"}} 
            onClick={(currentState=="NORMAL")?()=>{modify?setModify(false):setModify(true)}:()=>{}}>
            { 
                reverse ? 
                <ReverseClock props={{time: time, scale: scale}}/> : 
                <BasicClock initTime={stampToTime(timeStamp)} scale={scale}/>
            }
            <DigitalClock time={currentTime} scale={scale}/>
        </div>
    )
}