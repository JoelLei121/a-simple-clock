import { useEffect, useState } from "react";
import styles from "../styles/StopWatch.module.css";
import ControlClock from "./utils/ControlClock";

var intervalId = null;
export default function StopWatch({ scale=1 }) {
    const [status, setStatue] = useState('setting');
    const [recordList, setRecordList] = useState([]);

    const [counting, setCounting] = useState(0);
    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });

    function incPerSec() {
        setCounting(s => (s + 1 + 86400) % 86400);
    }

    useEffect((prevStatus) => {
        if(prevStatus != 'running' && status === 'running') {
            intervalId = setInterval(incPerSec, 1000);
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
    }, [counting])

    function handleStart() {
        setStatue('running');
    }
    function handleStop() {
        setStatue('stopped');
    }
    function handleReset() {
        setStatue('setting');
        setRecordList([]);
        setCounting(0);
    }
    function handleRecord() {
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
            <ControlClock time={time} scale={scale}/>
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
                    return <Record index={item.index} time={item.time} />
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