import SampleComponent from "../components/sample";
import BasicClock from "../components/utils/BasicClock";
import AutoClock from "../components/utils/AutoClock";
import FloatingButton from "../components/FloatingButton";
import ClockList from "../components/ClockList";

import { useContext } from "react";
import { CurrentStateContext } from "../contexts/GlobalContext";
import DigitalClock from "../components/DigitalClock";
import StopWatch from "../components/StopWatch";
import Timer from "../components/Timer";


export default function HomePage() {
    const context = useContext(CurrentStateContext);
    const currentState = context.currentState;

    const mainClockScale = currentState === 'NORMAL' ? 2 : 0.5;
    const mainClockPosition = currentState === 'NORMAL' ? 
        {position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"} : 
        {position: "absolute", right: "60px", top: "40px"};

    return (
        <>
            <div style={{width: "100%", height: "100%"}}>
                {/* normal clock */}
                <div style={...mainClockPosition}>
                    <AutoClock scale={mainClockScale} /> 
                </div>

                {/* stop watch */}
                {
                    currentState === 'STOPWATCH' &&
                    <StopWatch scale={2}/>
                }

                {/* timer */}
                {
                    currentState === 'TIMER' &&
                    <Timer scale={2}/>
                }
                
            </div>
            <FloatingButton style={{right: '24px', bottom: '24px'}} />
            {/* <ClockList>
                <AutoClock scale={1.2}/>
                <AutoClock scale={0.6}/>
                <AutoClock scale={0.3}/>
                <AutoClock scale={1}/>
                
            </ClockList> */}
        </>
    )
}