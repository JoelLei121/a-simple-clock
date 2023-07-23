import { useContext, useState } from "react";
import { CurrentStateContext } from "../contexts/GlobalContext";
import styles from "../styles/FloatingButton.module.css";

export default function FloatingButton({style, handleStopWatch, handleTimer}) {
    const radius = 40;
    const [expand, setExpand] = useState(false);
    const context = useContext(CurrentStateContext);
    const currentState = context.currentState;

    function handleExpand() {
        setExpand(s => !s);
    }
    function switchState(state) {
        context.setCurrentState(state);
        setExpand(false);
    }

    return (
        <div style={{...style, position: "absolute", zIndex: 10, width: radius*5, height: radius*5}}>
            <svg width={radius*2} height={radius*2} style={{ position: "absolute", right: 0, bottom: 0 }} onClick={handleExpand}>        
                <g>
                    {/* <circle id="shadow" style={{fill:"rgba(0,0,0,0.1)"}} cx="97" cy="100" r="87" filter="url(#innerShadow)"></circle> */}
                    <circle id="circle" style={{fill:"#D71313"}} cx={radius} cy={radius} r={radius}></circle>
                </g>
                <g>
                    <line x1={radius} y1={radius * 1.5} x2={radius} y2={radius * 0.5} style={{strokeWidth: "3px", stroke: "#F0DE36"}}></line>
                    <line x1={radius} y1={radius * 1.5} x2={radius} y2={radius * 0.5} transform={`rotate(90, ${radius}, ${radius})`} style={{strokeWidth: "3px", stroke: "#F0DE36"}}></line>
                </g>
            </svg>
            <Button style={{ right: '5%', bottom: '65%', visibility: (expand ? "visible" : "hidden")}} title="Stop Watch" onClick={() => switchState('STOPWATCH')}/>
            <Button style={{ right: '45%', bottom: '40%', visibility: (expand ? "visible" : "hidden")}} title="Timer" onClick={() => switchState('TIMER')}/>
            <Button style={{ left: '5%', bottom: '5%', visibility: (expand ? "visible" : "hidden")}} title="Normal" onClick={() => switchState('NORMAL')}/>
        </div>
        
    )
}

function Button({ style, title, onClick }) {
    return (
        <button style={{...style}} className={styles.button} onClick={onClick}>{title}</button>
    )
}