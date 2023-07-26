import { useContext, useEffect, useState } from "react";
import styles from "../styles/AlarmList.module.css";
import { CurrentTimeContext, AlarmTimeContext } from "../contexts/GlobalContext";
import ChangeClock from "./utils/ChangeClock";

export default function AlarmList({ alarmActivated, setAlarmActivated }) {
    const timeContext = useContext(CurrentTimeContext);
    const currentTime = timeContext.currentTime;
    const [alarmDataList, setAlarmDataList] = useState([]);
    const [resetList, setResetList] = useState([]);
    const mockAlarmData = { time: { hour: 0, minute: 1, second: 0 }, title: "title", enabled: false }

    const AlarmContext = useContext(AlarmTimeContext);

    const [modifying, setModifying] = useState(false);

    function getTimeString(time) {
        return `${time.hour}:${time.minute}`
    }

    useEffect(() => {
        // check if alarm is activated
        if(alarmActivated) {
            return;
        }
        
        let tempResetList = [...resetList];
        alarmDataList.map((item, k) => {
            const time = item.time;
            const title = item.title;
            if(currentTime.hour === time.hour && currentTime.minute === time.minute && item.enabled) {
                // console.log(`Alarm ${k}: ${item.title} at ${getTimeString(item.time)} is activated!`);
                tempResetList[k] = true;
                handleOnChange(k, false);
                AlarmContext.setAlarmTime(time);
                AlarmContext.setAlarmTitle(title)
                setAlarmActivated(true);
                return;
            }
        })
    }, [currentTime]);

    /* reset alarm enable switch */
    useEffect((prev) => {
        if(prev === true && alarmActivated === false) {
            tempList = resetList.map((item) => false);
            setResetList(tempList);
        }
    }, [alarmActivated]);

    /* alarm data list enable */
    function handleOnChange(index, enabled) {
        let tempList = [...alarmDataList];
        console.log('set ', tempList[index], 'to ', enabled)
        tempList[index].enabled = enabled;
        setAlarmDataList([...tempList]);
    }

    useEffect(() => {
        console.log(alarmDataList);
    }, [alarmDataList])
    
    /* add alarm */
    function handleAddAlarm() {
        // setModifying(true);
        handleConfirm(mockAlarmData.time)
    }
    function handleCancel() {
        setModifying(false);
    }
    function handleConfirm(time) {
        setModifying(false);
        setAlarmDataList(l => [
            ...l, 
            {
                time: {...time},
                title: 'title',
                enabled: true
            }
        ]);
        setResetList(l => [
            ...l, 
            false
        ]);
    }

    return (
        <>
            <div className={styles.AlarmList}>
                <div className={styles.list}>
                    {
                        alarmDataList.map((data, i) => {
                            return <AlarmItem 
                                key={i} index={i} time={data.time} title={data.title} 
                                enabled={data.enabled} onChange={handleOnChange}
                                reset={resetList[i]}
                            />
                        })
                    }
                </div>
                <button className={styles.addButton} onClick={handleAddAlarm}>+ Add Alarm</button>
            </div>
            {
                modifying &&
                <div style={{position: "fixed", top: 0, left: 0}}>
                    <ChangeClock initTime={currentTime} scale={2} handleConfirm={handleConfirm} handleCancel={handleCancel}/>
                </div>
            }
        </>
    )
}

function AlarmItem({ index, time={ hour: 0, minute: 0, second: 0 }, title="title", enabled, onChange, reset=false }) {

    useEffect((prev) => {
        if(prev === true && reset === false) {
            setEnabled(false);
        }
    }, [reset]);

    function setEnabled(value) {
        onChange(index, value);
    }

    return (
        <div className={styles.AlarmItem}>
            <div>
                <p style={{fontSize: "28px"}}>{
                `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
                }</p>
                <p style={{fontSize: "16px"}}>{title}</p>
            </div>
            <ToggleSwitch value={enabled} setValue={setEnabled}/>
        </div>
    )
}

function ToggleSwitch({ value, setValue }) {
    return (
        <label className={styles.toggleSwitch}>
            <input type="checkbox" onChange={e => setValue(e.target.checked)} checked={value}/>
            <span className={styles.slider}></span>
        </label>
    )
}