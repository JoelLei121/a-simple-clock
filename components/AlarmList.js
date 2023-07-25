import { useContext, useEffect, useState } from "react";
import styles from "../styles/AlarmList.module.css";
import { CurrentTimeContext } from "../contexts/GlobalContext";

export default function AlarmList() {
    const context = useContext(CurrentTimeContext);
    const currentTime = context.currentTime;
    const [alarmDataList, setAlarmDataList] = useState([]);
    const mockAlarmData = { time: { ...context.currentTime }, title: "title", enabled: false }

    function getTimeString(time) {
        return `${time.hour}:${time.minute}`
    }

    useEffect(() => {
        // check if alarm is activated
        alarmDataList.map((item, k) => {
            const time = item.time
            if(currentTime.hour === time.hour && currentTime.minute === time.minute && item.enabled) {
                console.log(`Alarm ${k} at ${getTimeString(item.time)} is activated!`);
            }
        })
    }, [currentTime])

    function handleOnChange(index, enabled) {
        let tempList = [...alarmDataList];
        tempList[index].enabled = enabled;
        setAlarmDataList([...tempList]);
    }

    function handleAddAlarm() {
        setAlarmDataList(l => [...l, {...mockAlarmData}])
    }
    return (
        <div className={styles.AlarmList}>
            <div className={styles.list}>
                {
                    alarmDataList.map((data, i) => {
                        return <AlarmItem key={i} index={i} time={data.time} title={data.title} onChange={handleOnChange}/>
                    })
                }
            </div>
            <button className={styles.addButton} onClick={handleAddAlarm}>+ Add Alarm</button>
        </div>
    )
}

function AlarmItem({ index, time={ hour: 0, minute: 0, second: 0 }, title="title", onChange }) {

    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        onChange(index, enabled);
    }, [enabled])

    return (
        <div className={styles.AlarmItem}>
            <div>
                <p style={{fontSize: "28px"}}>{
                `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
                }</p>
                <p style={{fontSize: "20px"}}>{title}</p>
            </div>
            <ToggleSwitch setValue={setEnabled}/>
        </div>
    )
}

function ToggleSwitch({ setValue }) {
    function handleChange(e) {
        setValue(e.target.checked);
    }
    return (
        <label className={styles.toggleSwitch}>
            <input type="checkbox" onChange={e => handleChange(e)}/>
            <span className={styles.slider}></span>
        </label>
    )
}