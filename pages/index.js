import SampleComponent from "../components/sample";
import BasicClock from "../components/utils/BasicClock";
import AutoClock from "../components/utils/AutoClock";
import FloatingButton from "../components/FloatingButton";
import AlarmList from "../components/AlarmList";

import { useContext } from "react";
import { CurrentStateContext, CurrentTimeContext } from "../contexts/GlobalContext";
import DigitalClock from "../components/DigitalClock";
import StopWatch from "../components/StopWatch";
import Timer from "../components/Timer";


export default function HomePage() {
    const stateContext = useContext(CurrentStateContext);
    const currentState = stateContext.currentState;

    const timeContext = useContext(CurrentTimeContext);
    const initTime = timeContext.currentTime;

    const mainClockScale = currentState === 'NORMAL' ? 2 : 0.5;
    const mainClockPosition = currentState === 'NORMAL' ? 
        {position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"} : 
        {position: "absolute", right: "60px", top: "40px"};

    return (
        <>
            <div style={{width: "100%", height: "100%"}}>
                {/* normal clock */}
                <div style={...mainClockPosition}>
                    <AutoClock scale={mainClockScale} initTime={initTime}/> 
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
            <AlarmList />
        </>
    )
}