import { useContext, useEffect, useState } from "react";
import BasicClock from "./BasicClock";
import ReverseClock from "./ReverseClock";
import ChangeClock from "./ChangeClock";
import DigitalClock from "../DigitalClock";

import { CurrentTimeContext } from "../../contexts/GlobalContext";
import { CurrentStateContext } from "../../contexts/GlobalContext";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1 }) {
    const [counting, setCounting] = useState(0);
    const [time, setTime] = useState(initTime);
    const [modify,setModify] = useState(false);
    const [showChange,setShowChange] = useState(false);
    const timeContext = useContext(CurrentTimeContext);
    const stateContext = useContext(CurrentStateContext);
    const currentState = stateContext.currentState;

    function incPerSec() {
        setCounting(s => (s + 1 + 86400) % 86400);
    }

    useEffect(() => {
        setCounting(time.hour * 3600 + time.minute * 60 + time.second)
        intervalId = setInterval(incPerSec, 1000);
        /* BUG: Stop counting when alert, which means setInterval is not safe */
        return ()=>{
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
        timeContext.setCurrentTime(time);
    }, [time]);

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
                    <BasicClock props={{time: time, scale: scale}}/>
                }{
                    modify && <button style={{height:"30px",width:"160px",fontSize:"medium",borderRadius:"5px",backgroundColor:"#00d5ff",margin:"0 0 10px 0",color:"#ffffff",borderStyle:"none"}} 
                        onClick={()=>{setShowChange(true);setModify(false)}}>修改时间</button>
                }
                <DigitalClock time={time} scale={scale}/>
            </div>
            {
                showChange&&<div style={{ position:"fixed" ,left:"0",top:"0"}}>
                    <ChangeClock initTime={time} scale={scale} confirmTime={handleConfirm} cancel={handleCancel} />
                    </div>
            }

        </>
    )
}