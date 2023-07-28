import { useContext, useEffect, useState, useRef } from "react";
import { CurrentTimeContext, AlarmTimeContext } from "../contexts/GlobalContext";
import styles from "../styles/AlarmList.module.css";
import ChangeClock from "./utils/ChangeClock";

export default function AlarmList({ alarmActivated, setAlarmActivated }) {
    const timeContext = useContext(CurrentTimeContext);
    const currentTime = timeContext.currentTime;
    const alarmContext = useContext(AlarmTimeContext);
    const titleRef = useRef("Untitled");

    const [alarmDataList, setAlarmDataList] = useState([]);
    const [resetList, setResetList] = useState([]);
    const [modifying, setModifying] = useState(false);

    useEffect(() => {
        // check if alarm is activated
        if (alarmActivated) {
            return;
        }

        let tempResetList = [...resetList];
        alarmDataList.map((item, k) => {
            const time = item.time;
            const title = item.title;
            if (currentTime.hour === time.hour && currentTime.minute === time.minute && item.enabled) {
                tempResetList[k] = true;
                handleOnChange(k, false);
                alarmContext.setAlarmTime(time);
                alarmContext.setAlarmTitle(title)
                setAlarmActivated(true);
                return;
            }
        })
    }, [currentTime]);

    /* reset alarm enable switch */
    useEffect((prev) => {
        if (prev === true && alarmActivated === false) {
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
        let data = {
            time: { hour: Math.floor(time.hour), minute: Math.floor(time.minute), second: 0 },
            title: titleRef.current,
            enabled: true
        }
        titleRef.current = "Untitled"
        setAlarmDataList(l => [...l, data]);
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
                    {alarmDataList.map((data, i) => {
                        return (<AlarmItem
                            key={i} index={i} time={data.time} title={data.title}
                            enabled={data.enabled}
                            onChange={handleOnChange}
                            onDelete={handleDelete}
                            reset={resetList[i]} />
                        )
                    })}
                </div>
                <button className={styles.addButton} onClick={handleAddAlarm} style={{ borderRadius: "5px", backgroundColor: '#20B7AF', color: '#FFFFFF', cursor: 'pointer', border: "none" }}>+ Add Alarm</button>
            </div>
            {modifying && (
                <div className={styles.changeClock}>
                    <ChangeClock initTime={currentTime} scale={2} confirmTime={handleConfirm} cancel={handleCancel} />
                    <input type="text" placeholder="Title" style={{ height: "40px", fontSize: "30px", width: "150px", fontFamily: "sans-serif", borderRadius: "10px", borderColor: "gray" }}
                        onChange={(ev) => {
                            titleRef.current = ev.target.value;
                        }} />
                </div>
            )}
        </>
    )
}

function AlarmItem({ index, time = { hour: 0, minute: 0, second: 0 }, title = "title", enabled, onChange, onDelete, reset = false }) {
    const [deletable, setDeletable] = useState(false);

    useEffect((prev) => {
        if (prev === true && reset === false) {
            setEnabled(false);
        }
    }, [reset]);

    function setEnabled(value) {
        onChange(index, value);
    }

    return (
        <div className={styles.AlarmItem}>
            {deletable && <DeleteSvgButton className={styles.DeleteSvgButton} handleClick={() => { onDelete(index); setDeletable(false) }} />}
            <label className={styles.alarmSlider}>
                <input type="checkbox" onChange={e => { setDeletable(e.target.checked); }} checked={deletable} />
                <div>
                    <p style={{ fontSize: "28px" }}>{
                        `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
                    }</p>
                    <p style={{ fontSize: "20px", width: "140px", overflowX: "hidden" }}>{title}</p >
                </div>
                <ToggleSwitch value={enabled} setValue={setEnabled} />
            </label>
        </div>
    )
}

function ToggleSwitch({ value, setValue }) {
    return (
        <label className={styles.toggleSwitch}>
            <input type="checkbox" onChange={e => setValue(e.target.checked)} checked={value} />
            <span className={styles.slider} />
        </label>
    )
}

function DeleteSvgButton({ handleClick }) {
    return (
        <div className={styles.DeleteSvgButton} onClick={handleClick}>
            <svg width='100%' height='100%' viewBox="0 0 50 50">
                <g>
                    <line x1="25" y1="10" x2="25" y2="40" transform={`rotate(45 25 25)`} style={{ strokeWidth: "2px", stroke: "#FFF" }} />
                    <line x1="25" y1="10" x2="25" y2="40" transform={`rotate(315 25 25)`} style={{ strokeWidth: "2px", stroke: "#FFF" }} />
                </g>
            </svg>
        </div>
    )
}