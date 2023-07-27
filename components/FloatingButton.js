import { useContext, useState } from "react";
import { CurrentStateContext } from "../contexts/GlobalContext";
import { CurrentStyleContext } from "../contexts/GlobalContext";
import styles from "../styles/FloatingButton.module.css";

export default function FloatingButton({ style, handleStopWatch, handleTimer }) {
    const radius = 40;
    const [expand, setExpand] = useState(false);
    const [showChangeStyle, setShowChangeStyle] = useState(false);
    const stateContext = useContext(CurrentStateContext);
    const currentState = stateContext.currentState;
    const styleContext = useContext(CurrentStyleContext);

    function handleExpand() {
        setExpand(s => !s);
        setShowChangeStyle(false);
    }
    function handleChangeStyle() {
        setShowChangeStyle(s => !s);
    }
    function switchState(state) {
        stateContext.setCurrentState(state);
        setExpand(false);
        setShowChangeStyle(false);
    }
    function switchStyle(style) {
        styleContext.setCurrentStyle(style);
        setExpand(false);
        setShowChangeStyle(false);
    }

    return (
        <div style={{ ...style, position: "absolute", zIndex: 10, width: radius * 5, height: radius * 5 }}>
            <svg width={radius * 2} height={radius * 2} style={{ position: "absolute", right: 0, bottom: 0 ,cursor: 'pointer'}} onClick={handleExpand}>
                <g>
                    {/* <circle id="shadow" style={{fill:"rgba(0,0,0,0.1)"}} cx="97" cy="100" r="87" filter="url(#innerShadow)"></circle> */}
                    <circle id="circle" style={{ fill: "#20B7AF" }} cx={radius} cy={radius} r={radius}></circle>
                </g>
                <g>
                    <line x1={radius} y1={radius * 1.5} x2={radius} y2={radius * 0.5} style={{ strokeWidth: "3px", stroke: "#FFFFFF" }}></line>
                    <line x1={radius} y1={radius * 1.5} x2={radius} y2={radius * 0.5} transform={`rotate(90, ${radius}, ${radius})`} style={{ strokeWidth: "3px", stroke: "#FFFFFF" }}></line>
                </g>
            </svg>
            <div >
            <Button style={{ right: '3%', bottom: '50%', visibility: (expand ? "visible" : "hidden") , backgroundColor: '#20B7AF', cursor: 'pointer',border: "none"}} title="Stop Watch" onClick={() => switchState('STPWATCH')} />
            <Button style={{ right: '3%', bottom: '80%', visibility: (expand ? "visible" : "hidden") , backgroundColor: '#20B7AF', cursor: 'pointer',border: "none"}} title="Timer" onClick={() => switchState('TIMER')} />
            <Button style={{ right: '3%', bottom: '110%', visibility: (expand ? "visible" : "hidden") , backgroundColor: '#20B7AF', cursor: 'pointer',border: "none"}} title="Normal" onClick={() => switchState('NORMAL')} />
            <Button style={{ right: "50%", bottom: "10%", visibility: (expand && (currentState === 'NORMAL') ? "visible" : "hidden") , backgroundColor: '#20B7AF', cursor: 'pointer',border: "none"}} title="Change Style" onClick={handleChangeStyle} />

            {/* 显示样式按钮 */}
            
                <Button style={{ right: '50%', bottom: '35%', visibility: (showChangeStyle ? "visible" : "hidden"), borderRadius: "50%" , backgroundColor: 'gray', cursor: 'pointer',border: "none"}} title="Basic" onClick={() => switchStyle("BASIC")} />
                <Button style={{ right: '90%', bottom: '35%', visibility: (showChangeStyle ? "visible" : "hidden"), borderRadius: "50%" , backgroundColor: 'gray', cursor: 'pointer',border: "none"}} title="Roman" onClick={() => switchStyle("ROMAN")} />
                <Button style={{ right: '90%', bottom: '10%', visibility: (showChangeStyle ? "visible" : "hidden"), borderRadius: "50%" , backgroundColor: 'gray', cursor: 'pointer',border: "none"}} title="Plate" onClick={() => switchStyle("PLATE")} />
            </div>


        </div>

    )
}

function Button({ style, title, onClick }) {
    return (
        <button style={{ ...style }} className={styles.button} onClick={onClick}>{title}</button>
    )
}