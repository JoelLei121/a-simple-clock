import BasicClock from "./BasicClock";

export default function ReverseClock(time) {
    let temp={hour:0,minute:0,second:0}
    temp.second=time.second * -1;
    temp.time.minute = data.time.minute * -1;
    temp.time.hour = data.time.hour * -1;
    return <BasicClock data={temp} />
}