import { useContext, useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import ChangeClock from "./ChangeClock";
import DigitalClock from "../DigitalClock";

import { CurrentTimeContext } from "../../contexts/GlobalContext";
import { CurrentStateContext } from "../../contexts/GlobalContext";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const [initStamp, setInitStamp] = useState(timeToStamp(initTime));
    const [stakeStamp, setStakeStamp] = useState(Math.floor(performance.now()));
    const [timeStamp, setTimeStamp] = useState(0);
    const [time, setTime] = useState(initTime);

    const [modify,setModify] = useState(false);
    const [showChange,setShowChange] = useState(false);
    const timeContext = useContext(CurrentTimeContext);
    const stateContext = useContext(CurrentStateContext);
    const currentState = stateContext.currentState;
    const currentTime = timeContext.currentTime;

    //不可逆操作，stamp只用于迭代，不用于显示
    function stampToTime(stamp){
        return {hour:stamp/3600000,minute:stamp%3600000/60000,second:stamp%60000/1000}
    }
  
    function timeToStamp(time){
        return Math.floor(time.hour*3600000+time.minute*60000+time.second*1000);
    }

    function updateTimeStamp(){
        let now = Math.floor(performance.now());
        let stamp = (now - stakeStamp+ initStamp)%86400000;
        setTimeStamp(stamp);
    }

    // useEffect(() => {
    //     intervalId = setInterval(updateTimeStamp,30);
    //     return () => {
    //         clearInterval(intervalId);
    //     }
    // }, []);

    useEffect(() => {
        let stampSecond=timeStamp/1000;
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
        setInitStamp(timeToStamp(time))
        setStakeStamp(Math.floor(performance.now()))
        setModify(false)
        setShowChange(false)
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", filter: showChange?"blur(10px)":"none"}} 
                onClick={(currentState=="NORMAL")?()=>{modify?setModify(false):setModify(true)}:()=>{}}>
                { 
                    reverse ? 
                    <ReverseClock props={{time: time, scale: scale}}/> : 
                    <BasicClock initTime={stampToTime(timeStamp)} scale={scale}/>
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