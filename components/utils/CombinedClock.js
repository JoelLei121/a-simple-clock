import BasicClock from "./BasicClock";
import DigitalClock from "../DigitalClock";

export default function CombinedClock({ 
    time = { hour: 0, minute: 0, second: 0 }, 
    scale = 1 
}) {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <BasicClock time={time} scale={scale}/>
            <DigitalClock time={time} scale={scale}/>
        </div>
    )
}