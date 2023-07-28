import { useContext, useState } from "react";
import { CurrentStateContext, CurrentTimeContext } from "../contexts/GlobalContext";
import AutoClock from "../components/utils/AutoClock";
import FloatingButton from "../components/FloatingButton";
import AlarmList from "../components/AlarmList";
import Alarm from "../components/utils/Alarm";
import StopWatch from "../components/StopWatch";
import Timer from "../components/Timer";

export default function HomePage() {
    const stateContext = useContext(CurrentStateContext);
    const currentState = stateContext.currentState;

    const timeContext = useContext(CurrentTimeContext);
    const initTime = timeContext.currentTime;

    const [alarmActivated, setAlarmActivated] = useState(false);

    const mainClockScale = currentState === 'NORMAL' ? 2 : 0.5;
    const mainClockPosition = currentState === 'NORMAL' ? 
        {position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"} : 
        {position: "absolute", right: "60px", top: "40px"};

    return (
        <>
            <div style={{width: "100%", height: "100%"}}>
                {/* normal clock */}
                <AutoClock scale={mainClockScale} initTime={initTime} positionStyle={...mainClockPosition}/> 

                {/* stop watch */}
                {currentState === 'STOPWATCH' && <StopWatch scale={2}/>}

                {/* timer */}
                {currentState === 'TIMER' && <Timer scale={2} alarmActivated={alarmActivated} />} 
            </div>
            <FloatingButton style={{right: '24px', bottom: '24px'}} />
            <AlarmList alarmActivated={alarmActivated} setAlarmActivated={setAlarmActivated}/>
            
            {/* Alarm */}
            {alarmActivated && <Alarm url={"/audios/test.mp3"} setAlarmActivated={setAlarmActivated}/>}
        </>
    )
}