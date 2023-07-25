import { useEffect, useState } from "react";
import styles from "../styles/Timer.module.css";
import ControlClock from "./utils/ControlClock";


var intervalId = null;
export default function Timer({ scale=1 }) {
    const [status, setStatue] = useState('stopped');
    const [counting, setCounting] = useState(0);
    const [completion, setCompletion] = useState(true);
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

            setStatue('stopped');
        
            /* TODO: time up */
            if(!completion){
                setCompletion(true);
                console.log('timer finished');
            }
        }
    }, [counting])

    function handleStart() {
        /* TODO: set timer with clock or digital clock */
        setCounting(3);
        setCompletion(false);
        setStatue('running');
    }
    function handleStop() {
        setCounting(0);
        setStatue('stopped');
    }
    function handleSuspend() {
        setStatue('suspended');
    }
    function handleContinue() {
        setStatue('running');
    }

    return (
        <div className={styles.Timer}>
            <ControlClock time={time} scale={scale}/>
            <ButtonSet status={status} methods={
                {start: handleStart, stop: handleStop, continue: handleContinue, suspend: handleSuspend}
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
                status != 'stopped' && 
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
        </div>
    )
}