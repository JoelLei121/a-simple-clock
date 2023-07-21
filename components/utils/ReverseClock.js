import BasicClock from "./BasicClock";

export default function ReverseClock({ data }) {
    let temp = {...data};
    temp.time.second = data.time.second * -1;
    temp.time.minute = data.time.minute * -1;
    temp.time.hour = data.time.hour * -1;
    return <BasicClock data={temp} />
}