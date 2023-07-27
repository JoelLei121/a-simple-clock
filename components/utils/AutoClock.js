import { useContext, useEffect, useState, useRef } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import ChangeClock from "./ChangeClock";
import DigitalClock from "../DigitalClock";
import {stampToTime,timeToStamp} from "./functions"

import { CurrentTimeContext } from "../../contexts/GlobalContext";
import { CurrentStateContext } from "../../contexts/GlobalContext";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const initStamp=useRef(timeToStamp(initTime))
    const stakeStamp=useRef(Math.floor(performance.now()))
    const [timeStamp, setTimeStamp] = useState(0);

    const [modify,setModify] = useState(false);
    const [showChange,setShowChange] = useState(false);
    const timeContext = useContext(CurrentTimeContext);
    const stateContext = useContext(CurrentStateContext);
    const currentState = stateContext.currentState;
    const currentTime = timeContext.currentTime;



    function updateTimeStamp(){
        let now = Math.floor(performance.now());
        let stamp = (now - stakeStamp.current+ initStamp.current)%86400000;
        console.log(stamp)
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

    function handleCancel(){
        setModify(false)
        setShowChange(false)
    }

    function handleConfirm(time){
        console.log(time)
        console.log(stampToTime(timeToStamp(time)))
        setTimeStamp(timeToStamp(time))
        console.log( "previous:"+initStamp.current)
        initStamp.current=timeToStamp(time)
        console.log("after:"+initStamp.current)
        stakeStamp.current=Math.floor(performance.now())
        setModify(false)
        setShowChange(false)
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", filter: showChange?"blur(10px)":"none"}} 
                onClick={(currentState=="NORMAL")?()=>{modify?setModify(false):setModify(true)}:()=>{}}>
                { 
                    // reverse ? 
                    // <ReverseClock props={{time: time, scale: scale}}/> : 
                    <BasicClock time={stampToTime(timeStamp)} scale={scale}/>
                }{
                    modify && <button style={{height:"30px",width:"160px",fontSize:"medium",borderRadius:"5px",backgroundColor:"#00d5ff",margin:"0 0 10px 0",color:"#ffffff",borderStyle:"none"}} 
                        onClick={()=>{setShowChange(true);setModify(false)}}>修改时间</button>
                }
                <DigitalClock time={currentTime} scale={scale}/>
            </div>
            {
                showChange&&<div style={{ position:"fixed" ,left:"0",top:"0"}}>
                    <ChangeClock initTime={stampToTime(timeStamp)} scale={scale} confirmTime={handleConfirm} cancel={handleCancel} />
                    </div>
            }

        </>
    )
}