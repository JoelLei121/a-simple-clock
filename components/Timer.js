import { useEffect, useState } from "react";
import styles from "../styles/Timer.module.css";
import CombinedClock from "./utils/CombinedClock";
import Alarm, { AlarmAudio } from "./utils/Alarm";


var intervalId = null;
export default function Timer({ scale=1, url="http://streaming.tdiradio.com:8000/house.mp3" }) {
    const [status, setStatue] = useState('stopped'); //['stopped', 'running', 'suspended', 'alarm']
    const [counting, setCounting] = useState(0);
    const [alarmOff, setAlarmOff] = useState(true); //alarm never work or has been closed
    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });

    function decPerSec() {
        setCounting(s => (s - 1));
    }

    useEffect((prevStatus) => {
        if(prevStatus != 'running' && status === 'running') {
            intervalId = setInterval(decPerSec, 1000);
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
        setTime({
            hour: counting / 3600,
            minute: counting / 60,
            second: counting % 60
        })

        if(counting === 0){
            if(alarmOff){setStatue("stopped");}
            else{setStatue("alarm")}
        }
    }, [counting])

    function handleStart() {
        /* TODO: set timer with clock or digital clock */
        setCounting(3);
        setAlarmOff(false);
        setStatue('running');
    }
    function handleStop() {
        setCounting(0);
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


    return (
        <div className={styles.Timer}>
            {
                status === 'alarm' && <AlarmAudio url={url}/>
            }
            <CombinedClock time={time} scale={scale}/>
            <ButtonSet status={status} methods={
                {start: handleStart, stop: handleStop, continue: handleContinue, suspend: handleSuspend, stopAlarm: handleStopAlarm}
            }/>
        </div>
    )
}



function ButtonSet({status, methods}) {
    return (
        <div className={styles.buttonList}>
            {
                status === 'stopped' && 
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
