import { useContext, useEffect, useState, useRef } from "react";
import BasicClock from "./BasicClock";
import ChangeClock from "./ChangeClock";
import DigitalClock from "../DigitalClock";
import { stampToTime, timeToStamp } from "./functions"
import { CurrentTimeContext } from "../../contexts/GlobalContext";
import { CurrentStateContext } from "../../contexts/GlobalContext";
import { CurrentStyleContext } from "../../contexts/GlobalContext";
import RomanClock from "../styled_clocks/RomanClock";
import PlateClock from "../styled_clocks/PlateClock";
import styles from "../../styles/AutoClock.module.css";

var intervalId;
export default function AutoClock({ reverse=false, initTime={ hour: 0, minute: 0, second: 0}, scale=1, positionStyle }) {
    const initStamp = useRef(timeToStamp(initTime))
    const stakeStamp = useRef(Math.floor(performance.now()))
    const [timeStamp, setTimeStamp] = useState(0);

    const [modify, setModify] = useState(false);
    const [showChange, setShowChange] = useState(false);
    const timeContext = useContext(CurrentTimeContext);
    const stateContext = useContext(CurrentStateContext);
    const styleContext = useContext(CurrentStyleContext);
    const currentState = stateContext.currentState;
    const currentStyle = styleContext.currentStyle;
    const currentTime = timeContext.currentTime;
    let ClockComponent;
    switch (currentStyle) {
        case "BASIC":
            ClockComponent = BasicClock;
            break;
        case "ROMAN":
            ClockComponent = RomanClock;
            break;
        case "PLATE":
            ClockComponent = PlateClock;
            break;
        default:
            ClockComponent = BasicClock; // 默认使用 BasicClock 组件
    }


    function updateTimeStamp() {
        let now = Math.floor(performance.now());
        let stamp = (now - stakeStamp.current + initStamp.current) % 86400000;
        setTimeStamp(stamp);
    }

    useEffect(() => {
        intervalId = setInterval(updateTimeStamp, 30);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        let stampSecond = Math.floor(timeStamp / 1000);
        let time = { hour: Math.floor(stampSecond / 3600), minute: Math.floor(stampSecond / 60) % 60, second: stampSecond % 60 };
        timeContext.setCurrentTime(time);
    }, [timeStamp]);

    function handleCancel() {
        setModify(false)
        setShowChange(false)
    }

    function handleConfirm(time) {
        setTimeStamp(timeToStamp(time))
        initStamp.current = timeToStamp(time)
        stakeStamp.current = Math.floor(performance.now())
        setModify(false)
        setShowChange(false)
    }

    return (
        <>
            <div style={{...positionStyle, display: "flex", flexDirection: "column", alignItems: "center"}} 
                onClick={(currentState=="NORMAL") ? () => {modify ? setModify(false) : setModify(true)} : () => {}}>
                
                <BasicClock time={stampToTime(timeStamp)} scale={scale}/>
                {
                    (modify && currentState=="NORMAL") && 
                    <button className={styles.modifyButton} onClick={() => { setShowChange(true); setModify(false) }}>修改时间</button>
                }
                <DigitalClock time={currentTime} scale={scale} />
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