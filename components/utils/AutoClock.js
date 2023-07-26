import { useContext, useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import ChangeClock from "./ChangeClock";
import DigitalClock from "../DigitalClock";

import { CurrentTimeContext } from "../../contexts/GlobalContext";
import { CurrentStateContext } from "../../contexts/GlobalContext";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const [initStamp, setInitStamp] = useState(initTime.hour * 3600 + initTime.minute * 60 + initTime.second);
    const [stakeStamp, setStakeStamp] = useState(Math.floor(performance.now()));
    const [timeStamp, setTimeStamp] = useState(0);

    const [modify,setModify] = useState(false);
    const [showChange,setShowChange] = useState(false);
    const timeContext = useContext(CurrentTimeContext);
    const stateContext = useContext(CurrentStateContext);
    const currentState = stateContext.currentState;
    const currentTime = timeContext.currentTime;


    useEffect(() => {
        let stampSecond=timeStamp/1000;
        let time={hour: Math.floor(stampSecond/3600), minute: Math.floor(stampSecond/60)%60, second: stampSecond%60};
        timeContext.setCurrentTime(time);
    }, [timeStamp]);


    useEffect(()=>{
        runTime();
    },[])

    function runTime(){
        let now = Math.floor(performance.now());
        let time = (now - stakeStamp+ initStamp)%86400000;
        // setTimeStamp(time);
        requestAnimationFrame(runTime);
    }

    function handleCancel(){
        setModify(false)
        setShowChange(false)
    }

    function handleConfirm({hour,minute,second}){
        setTime({
            hour: hour,
            minute: minute,
            second: second
        })
        setCounting(hour * 3600 + minute * 60 + second)
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
                    <BasicClock props={{timeStamp:timeStamp, scale: scale}}/>
                }{
                    modify && <button style={{height:"30px",width:"160px",fontSize:"medium",borderRadius:"5px",backgroundColor:"#00d5ff",margin:"0 0 10px 0",color:"#ffffff",borderStyle:"none"}} 
                        onClick={()=>{setShowChange(true);setModify(false)}}>修改时间</button>
                }
                <DigitalClock time={currentTime} scale={scale}/>
            </div>
            {
                showChange&&<div style={{ position:"fixed" ,left:"0",top:"0"}}>
                    <ChangeClock initTime={time} scale={scale} confirmTime={handleConfirm} cancel={handleCancel} />
                    </div>
            }

        </>
    )
}