import { useEffect, useState, useRef } from "react";
import styles from "../styles/StopWatch.module.css";
import CombinedClock from "./utils/CombinedClock";
import { stampToTime,timeToStamp } from "./utils/functions";    

var intervalId = null;
export default function StopWatch({ scale=1 }) {
    const initStamp=useRef(0)
    const stakeStamp=useRef(0)
    const [timeStamp, setTimeStamp] = useState(0);

    const [status, setStatue] = useState('setting');
    const [recordList, setRecordList] = useState([]);  


    useEffect((prevStatus) => {
        if(prevStatus != 'running' && status === 'running') {
            console.log("create")
            initStamp.current=timeStamp
            stakeStamp.current=Math.floor(performance.now())
            intervalId=setInterval(()=>{
                let now = Math.floor(performance.now());
                let stamp = (now - stakeStamp.current+ initStamp.current)%86400000;
                setTimeStamp(stamp);
            },30)
        } else if (status != 'running') {
            if(intervalId != null) {
                console.log("inside clear")
                clearInterval(intervalId);
            }
            intervalId = null;
        }
        /* BUG: Stop counting when alert, which means setInterval is not safe */
        /* BUG: Restart will cause loss of time, which is inaccurate */
    }, [status]);

    function handleStart() {
        setStatue('running');
    }
    function handleStop() {
        setStatue('stopped');
    }
    function handleReset() {
        initStamp.current=0;
        stakeStamp.current=0;
        setTimeStamp(0)
        setStatue('setting');
        setRecordList([]);
    }
    function handleRecord() {
        let time=stampToTime(timeStamp)
        setRecordList(l => [
            ...l,
            {
                index: l.length + 1,
                time: {
                    hour: Math.floor(time.hour),
                    minute: Math.floor(time.minute),
                    second: Math.floor(time.second)
                }
            }
        ]);
    }
    function handleContinue() {
        setStatue('running');
    }

    return (
        <div className={styles.StopWatch}>
            <CombinedClock time={stampToTime(timeStamp)} scale={scale}/>
            <ButtonSet status={status} methods={
                {start: handleStart, stop: handleStop, continue: handleContinue, reset: handleReset, record: handleRecord}
            }/>

            <RecordList recordList={recordList}/>
        </div>
    )
}



function ButtonSet({status, methods}) {
    return (
        <div className={styles.buttonList}>
            {
                status === 'setting' && 
                <button className={styles.button} onClick={methods.start}>Start</button>
            }
            {
                status === 'running' && 
                <button className={styles.button} onClick={methods.stop}>Stop</button>
            }
            {
                status === 'stopped' && 
                <button className={styles.button} onClick={methods.continue}>Continue</button>
            }
            {
                status != 'setting' &&
                <button className={styles.button} onClick={methods.reset}>Reset</button>
            }
            {
                status != 'setting' && 
                <button className={styles.button} onClick={methods.record}>Record</button>
            }
            
        </div>
    )
}

function RecordList({recordList}) {
    return (
        <div className={styles.recordList}>
            {
                recordList.map((item) => {
                    return <Record key={item.index} index={item.index} time={item.time} />
                })
            }
        </div>
    )
}

function Record({index, time = { hour: 0, minute: 0, second: 0 }}) {
    function timeToString(time) {
        return (time.hour).toString().padStart(2, "0") + ":" 
        + (time.minute).toString().padStart(2, "0") + ":" 
        + (time.second).toString().padStart(2, "0");
    }
    return(
        <div className={styles.record} >
            <span>{`第${index}圈`}</span>
            <span>{timeToString(time)}</span>
        </div>
    )
}