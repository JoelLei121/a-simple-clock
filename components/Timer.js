import { useEffect, useState, useRef } from "react";
import styles from "../styles/Timer.module.css";
import CombinedClock from "./utils/CombinedClock";
import { AlarmAudio } from "./utils/Alarm"; 
import { stampToTime, timeToStamp } from "./utils/functions"; 
import ChangeClock from "./utils/ChangeClock";


var intervalId = null;
export default function Timer({ scale=1, url="/audios/test.mp3", alarmActivated=false }) {
    const [status, setStatue] = useState('stopped'); //['stopped', 'running', 'suspended', 'alarm']
    const [alarmOff, setAlarmOff] = useState(true); //alarm never work or has been closed
    const [showChange, setShowChange] = useState(false);
    
    const initStamp = useRef(0)
    const stakeStamp = useRef(0)
    const [timeStamp, setTimeStamp] = useState(0);

    useEffect((prevStatus) => {
        if(prevStatus != 'running' && status === 'running') {
            initStamp.current=timeStamp
            stakeStamp.current=Math.floor(performance.now())
            intervalId=setInterval(()=>{
                let now = Math.floor(performance.now());
                let stamp = (initStamp.current - now + stakeStamp.current)%86400000;
                setTimeStamp(stamp);
            },30)
        } else if (status != 'running') {
            if(intervalId != null) {
                clearInterval(intervalId);
            }
            intervalId = null;
        }
        /* BUG: Stop counting when alert, which means setInterval is not safe */
        /* BUG: Restart will cause loss of time, which is inaccurate */
    }, [status]);

    useEffect(() => {
        if(timeStamp <= 0){
            if(alarmOff){setStatue("stopped");}
            else{setStatue("alarm")}
            setTimeStamp(0)
        }
    }, [timeStamp])

    function handleStart() {
        setAlarmOff(false);
        setStatue('running');
    }
    function handleStop() {
        setTimeStamp(0);
        setAlarmOff(true);
        setStatue('stopped');
    }
    function handleSuspend() {
        setStatue('suspended');
    }
    function handleContinue() {
        setStatue('running');
    }
    function handleStopAlarm() {
        setAlarmOff(true);
        setStatue('stopped');
    }

    function handleCancel(){
        setShowChange(false);
        console.log("cancel");
    }

    function handleConfirm(time){
        setTimeStamp(timeToStamp(time));
        initStamp.current=timeToStamp(time);
        stakeStamp.current=Math.floor(performance.now());
        setShowChange(false);
        console.log("confirm");
    }

    return (
        <>
            <div className={styles.Timer}>
                {
                    (status === 'alarm' && !alarmActivated) && <AlarmAudio url={url}/>
                }
                <div onClick={()=>{setShowChange(true)}}>
                    <CombinedClock time={stampToTime(timeStamp)} scale={scale}/>
                </div>
                <ButtonSet status={status} timeStamp={timeStamp} methods={
                    {start: handleStart, stop: handleStop, continue: handleContinue, suspend: handleSuspend, stopAlarm: handleStopAlarm}
                }/>
            </div>
            {
                showChange && 
                <div className={styles.changeClock}>
                    <ChangeClock initTime={stampToTime(timeStamp)} scale={scale} confirmTime={handleConfirm} cancel={handleCancel} />
                </div>
            }
        </>
    )
}



function ButtonSet({status, timeStamp, methods}) {
    return (
        <div className={styles.buttonList}>
            {
                (status === 'stopped') && (timeStamp < 1000) &&
                <button className={styles.forbiddenButton} onClick={()=>{}}>Set Time To Start</button>
            }
            {
                (status === 'stopped') && (timeStamp >= 1000) &&
                <button className={styles.button} onClick={methods.start}>Start</button>
            }
            {
                (status === 'running' || status === 'suspended') &&
                <button className={styles.button} onClick={methods.stop}>Stop</button>
            }
            {
                status === 'running' && 
                <button className={styles.button} onClick={methods.suspend}>Suspend</button>
            }      
            {
                status === 'suspended' && 
                <button className={styles.button} onClick={methods.continue}>Continue</button>
            }   
            {
                status === 'alarm' && 
                <button className={styles.button} onClick={methods.stopAlarm}>Turn Off Alarm</button>
            }     
        </div>
    )
}
