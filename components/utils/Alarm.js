import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/Alarm.module.css";
import { CurrentTimeContext, AlarmTimeContext } from "../../contexts/GlobalContext";
import BasicClock from "./BasicClock";


export default function Alarm({ url, setAlarmActivated }) {
    const alarmContext = useContext(AlarmTimeContext);
    const time = alarmContext.alarmTime;
    const title = alarmContext.alarmTitle;
    const timeContext = useContext(CurrentTimeContext);

    function handleClick() {
        setAlarmActivated(false);
    }

    useEffect(() => {
        if(time.hour != timeContext.currentTime.hour || time.minute != timeContext.currentTime.minute) {
            setAlarmActivated(false);
        }
    }, [timeContext.currentTime])

    return (
        <div className={styles.Alarm} onClick={handleClick}>
            <h1>IT'S TIME!</h1>
            <BasicClock props={{time: {...time, second: 0}, scale: 2}}/>
            <span style={{fontSize: "24px"}}>{title}</span>
            <AlarmAudio url={url}/>
        </div>
    )

};

export function AlarmAudio({ url }) {
    return (
        <audio autoPlay loop>
            <source src={url} type="audio/mp3"/>
        </audio>
    )
}