import { useEffect, useState, useRef } from "react";
import styles from "../../styles/ChangeClock.module.css";
import BasicClock from "./BasicClock";
import DigitalClock from "../DigitalClock";


export default function ChangeClock({ initTime = { hour: 0, minute: 0, second: 0 }, scale = 1, confirmTime, cancel }) {
    const center = useRef({ x: 0, y: 0 })
    const overLoop = useRef(false)
    const prevAngle = useRef(0)
    const [time, setTime] = useState(initTime);
    const [dragging, setDragging] = useState(false);
    const [target, setTarget] = useState(0);

    const Hand = {
        second: 1,
        minute: 2,
        hour: 3
    }

    useEffect(() => {
        let chg = document.getElementById("changeClock")
        let circle = chg.querySelector("#circle")
        if (circle) {
            let rect = circle.getBoundingClientRect();
            center.current.x = (rect.left + rect.right) / 2;
            center.current.y = (rect.top + rect.bottom) / 2;
        }
    }, [])

    function handleMouseDown(ev) {
        if (ev.target.getAttribute("id") == "hourhand") {
            setDragging(true);
            setTarget(Hand.hour);
        }
        else if (ev.target.getAttribute("id") == "minutehand") {
            setDragging(true);
            setTarget(Hand.minute);
        }
        else if (ev.target.getAttribute("id") == "secondhand") {
            setDragging(true);
            setTarget(Hand.second);
        }
    }

    function handleMouseMove(ev) {
        if (dragging) {
            let angle = positionToAngle(ev.clientX, ev.clientY);

            if (target == Hand.second) {
                setTime({ ...time, second: angle / 6 })
            }
            else if (target == Hand.minute) {
                setTime({ ...time, minute: angle / 6 })
            }
            else if (target == Hand.hour) {
                if (prevAngle.current - angle > 300 || prevAngle.current - angle < -300) overLoop.current = !overLoop.current
                let loop = overLoop.current ? 12 : 0
                prevAngle.current = angle
                setTime({ ...time, hour: angle / 30 + loop })
            }
        }
    }

    function stopDragging(ev) {
        setDragging(false)
        setTarget(0)
    }

    function positionToAngle(x, y) {
        //angle between the mouse and the clock center along the positive x-axis (-180, 180)
        let angle = Math.atan2(center.current.y - y, x - center.current.x) * 180 / Math.PI
        //convert the angle to the clock coordinate system (0, 360)
        angle = 90 - angle
        if (angle < 0) {
            angle += 360
        }
        return angle
    }

    return (
        <div id="changeClock" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging}>
            <BasicClock time={time} scale={scale} />
            <div style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
                <DigitalClock time={time} scale={scale} />
                <div>
                    <input className={styles.input} type="number" min="0" max="23" step="1" value={Math.floor(time.hour)}
                        onChange={(ev) => {
                            if (ev.target.value < 0) setTime({ ...time, hour: 0 });
                            else if (ev.target.value >= 24) setTime({ ...time, hour: 23 });
                            else setTime({ ...time, hour: Number(ev.target.value) });
                        }
                        } />
                    <span>:</span>
                    <input className={styles.input} type="number" min="0" max="59" step="1" value={Math.floor(time.minute)}
                        onChange={(ev) => {
                            if (ev.target.value < 0) setTime({ ...time, minute: 0 });
                            else if (ev.target.value >= 60) setTime({ ...time, minute: 59 });
                            else setTime({ ...time, minute: Number(ev.target.value) });
                        }
                        } />
                    <span>:</span>
                    <input className={styles.input} type="number" min="0" max="59" step="1" value={Math.floor(time.second)}
                        onChange={(ev) => {
                            if (ev.target.value < 0) setTime({ ...time, second: 0 });
                            else if (ev.target.value >= 60) setTime({ ...time, second: 59 });
                            else setTime({ ...time, second: Number(ev.target.value) });
                        }
                        } />
                </div>
                <div style={{ justifyItems: "center" }}>
                    <button className={styles.button} style={{ backgroundColor: "#20B7AF", cursor: 'pointer' }} onClick={() => confirmTime(time)}>Confirm</button>
                    <button className={styles.button} style={{ backgroundColor: "#c9295e", cursor: 'pointer' }} onClick={() => cancel()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}