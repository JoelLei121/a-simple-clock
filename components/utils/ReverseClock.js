import BasicClock from "./BasicClock";

export default function ReverseClock({ time, initTime}) {

    time.second = time.second * -1;
    time.minute = time.minute * -1;
    time.hour = time.hour * -1;
    return <BasicClock time={time} initTime={initTime} />
}