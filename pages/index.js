import { useContext } from "react";
import SampleComponent from "../components/sample";
import { SampleContext } from "../contexts/SampleContext";
import BasicClock from "../components/utils/BasicClock";
import AutoClock from "../components/utils/AutoClock";

export default function HomePage() {
    const context = useContext(SampleContext);
    const sampleData = context.sampleData;

    const initTime = { hour: 0, minute: 5, second: 30 };

    return (
        <>
            <div style={{width: "100%", height: "100%"}}>
                {/* <SampleComponent message={sampleData.message}/> */}
                <AutoClock reverse={true} initTime={initTime}/>
                <AutoClock reverse={true}/>
                <AutoClock />
            </div>
        </>
    )
}