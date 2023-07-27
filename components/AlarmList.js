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
        setModifying(true);
        // handleConfirm(currentTime);
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

    function handleDelete(index) {
        console.log(index);
        let list = [...alarmDataList];
        list.splice(index, 1);
        setAlarmDataList([...list]);
        let resets = [...resetList];
        resets.splice(index, 1);
        setResetList([...resets]);
    }

    return (
        <>
            <div className={styles.AlarmList}>
                <div className={styles.list}>
                    {
                        alarmDataList.map((data, i) => {
                            return <AlarmItem 
                                key={i} index={i} time={data.time} title={data.title} 
                                enabled={data.enabled} 
                                onChange={handleOnChange}
                                onDelete={handleDelete}
                                reset={resetList[i]}
                            />
                        })
                    }
                </div>
                <button className={styles.addButton} onClick={handleAddAlarm}>+ Add Alarm</button>
            </div>
            {
                modifying &&
                <div className={styles.changeClock}>
                    <ChangeClock initTime={currentTime} scale={2} confirmTime={handleConfirm} cancel={handleCancel}/>
                </div>
            }
        </>
    )
}

function AlarmItem({ index, time={ hour: 0, minute: 0, second: 0 }, title="title", enabled, onChange, onDelete, reset=false }) {
    const [deletable, setDeletable] = useState(false);

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
            {
                deletable && <DeleteSvgButton className={styles.DeleteSvgButton} handleClick={() => {onDelete(index); setDeletable(false)}}/>
            }
            <label className={styles.alarmSlider}>
                <input type="checkbox"  onChange={e => { setDeletable(e.target.checked); }} checked={deletable} />
                <div>
                    <p style={{fontSize: "28px"}}>{
                    `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
                    }</p>
                    <p style={{fontSize: "20px"}}>{title}</p>
                </div>
                <ToggleSwitch value={enabled} setValue={setEnabled}/>
            </label>
        </div>
        // <div className={styles.AlarmItem}>
        //     <div>
        //         <p style={{fontSize: "28px"}}>{
        //         `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        //         }</p>
        //         <p style={{fontSize: "16px"}}>{title}</p>
        //     </div>
        //     <ToggleSwitch value={enabled} setValue={setEnabled}/>
        // </div>
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

function DeleteSvgButton({ handleClick }) {
    return (
        <div className={styles.DeleteSvgButton} onClick={handleClick}>
            <svg width='100%' height='100%' viewBox="0 0 50 50">
                <g>
                    <line x1="25" y1="10" x2="25" y2="40" transform={`rotate(45 25 25)`} style={{strokeWidth: "2px", stroke: "#FFF"}}></line>
                    <line x1="25" y1="10" x2="25" y2="40" transform={`rotate(315 25 25)`} style={{strokeWidth: "2px", stroke: "#FFF"}}></line>
                </g>
            </svg>
        </div>
    )
}