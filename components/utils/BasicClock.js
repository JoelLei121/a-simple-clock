import {useContext} from "react";
import {CurrentStyleContext} from "../../contexts/GlobalContext";
import RomanClock from "../styled_clocks/RomanClock";
import PlateClock from "../styled_clocks/PlateClock";

export default function BasicClock({ time = { hour: 0, minute: 0, second: 0 }, scale = 1 }) {
    const styleContext = useContext(CurrentStyleContext);
    const currentStyle = styleContext.currentStyle;

    if (currentStyle === "ROMAN") {
        return (<RomanClock time={time} scale={scale} />);
    } else if (currentStyle === "PLATE") {
        return (<PlateClock time={time} scale={scale} />);
    } else {
        return (
            <div style={{ width: `${200 * scale}px`, height: `${200 * scale}px` }}>
                <svg width='100%' height='100%' viewBox="0 0 200 200" >
                    {/* clock plate */}
                    <circle id="circle" style={{ stroke: "#FFF", strokeWidth: "12px", fill: "#20B7AF" }} cx="100" cy="100" r="80" />
                    {/* clock hands */}
                    <g>
                        <line id="hourhand" x1="100" y1="100" x2="100" y2="55" transform={`rotate(${time.hour % 12 * 30} 100 100)`} style={{ strokeWidth: "3px", stroke: "#fffbf9" }} />
                        <line id="minutehand" x1="100" y1="100" x2="100" y2="40" transform={`rotate(${time.minute * 6} 100 100)`} style={{ strokeWidth: "4px", stroke: "#fdfdfd" }} />
                        <line id="secondhand" x1="100" y1="100" x2="100" y2="30" transform={`rotate(${time.second * 6} 100 100)`} style={{ strokeWidth: "2px", stroke: "#C1EFED" }} />
                    </g>
                    {/* center */}
                    <circle id="center" style={{ fill: "#128A86", stroke: "#C1EFED", strokeWidth: "2px" }} cx="100" cy="100" r="3" />
                    {/* decoration */}
                    {[...Array(12).keys()].map(i => decoration(i))}
                </svg>
            </div>
        )
    }
}

const decoration = (i) => {
    return <line x1='100' y1='30' x2='100' y2='40' style={{ stroke: "#ffffff" }} transform={`rotate(${i * 30} 100 100)`} key={i} />
}