import { useContext } from "react";
import SampleComponent from "../components/sample";
import { SampleContext } from "../contexts/SampleContext";

export default function HomePage() {
    const context = useContext(SampleContext);
    const sampleData = context.sampleData;
    return (
        <>
            <div style={{width: "100%", height: "100%"}}>
                <SampleComponent message={sampleData.message}/>
            </div>
        </>
    )
}