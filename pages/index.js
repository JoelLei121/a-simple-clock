import { useContext } from "react";
import SampleComponent from "../components/sample";
import { SampleContext } from "../contexts/SampleContext";
import BasicClock from "../components/utils/BasicClock";
import AutoClock from "../components/utils/AutoClock";
import FloatingButton from "../components/FloatingButton";
import ClockList from "../components/ClockList";

export default function HomePage() {
    const context = useContext(SampleContext);
    const sampleData = context.sampleData;

    const initTime = { hour: 0, minute: 5, second: 30 };

    return (
        <>
            <div style={{width: "100%", height: "100%"}}>
                {/* <SampleComponent message={sampleData.message}/> */}
                {/* <AutoClock reverse={true} initTime={initTime}/>
                <AutoClock reverse={true}/> */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <AutoClock /> {/* BUG: Stop counting when alert, which means setInterval is not safe */}
                </div>
            </div>
            <FloatingButton style={{left: '24px', bottom: '24px'}} handleClick={() => { alert("click!"); }}/>
            <ClockList>
                <AutoClock scale={1.2}/>
                <AutoClock scale={0.6}/>
                <AutoClock scale={0.3}/>
                <AutoClock scale={1}/>
                
            </ClockList>
        </>
    )
}