export default function BasicClock({ props }) {

    let data = {...props};
    if(!('initTime' in data)) {
        data.initTime = { hour: 0, minute: 0, second: 0};
    }
    if(!('scale' in data)) {
        data.scale = 1;
    }
    if(!('time' in data)) {
        throw Error("Time attribute required");
    }
    // transform={`scale(${data.scale})`}
    return (
        <div style={{width: `${200*data.scale}px`, height: `${200*data.scale}px` }}>
            <svg width='100%' height='100%' viewBox="0 0 200 200" >
            
                {/* <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                    <feOffset in="blur" dx="2.5" dy="2.5"/>
                </filter> */}
            
                <g>
                    {/* <circle id="shadow" style={{fill:"rgba(0,0,0,0.1)"}} cx="97" cy="100" r="87" filter="url(#innerShadow)"></circle> */}
                    <circle id="circle" style={{stroke: "#FFF", strokeWidth: "12px", fill:"#20B7AF"}} cx="100" cy="100" r="80"></circle>
                </g>
                <g>
                    <line x1="100" y1="100" x2="100" y2="55" transform={`rotate(${(data.initTime.hour + data.time.hour)*15} 100 100)`} style={{strokeWidth: "3px", stroke: "#fffbf9"}} id="hourhand">
                    </line>
                    <line x1="100" y1="100" x2="100" y2="40" transform={`rotate(${(data.initTime.minute + data.time.minute)*6} 100 100)`} style={{strokeWidth: "4px", stroke: "#fdfdfd"}} id="minutehand">
                    </line>
                    <line x1="100" y1="100" x2="100" y2="30" transform={`rotate(${(data.initTime.second + data.time.second)*6} 100 100)`} style={{strokeWidth: "2px", stroke: "#C1EFED"}} id="secondhand">
                    </line>
                </g>
                <circle id="center" style={{fill:"#128A86", stroke: "#C1EFED", strokeWidth: "2px"}} cx="100" cy="100" r="3"></circle>

                <g>
                    { [...Array(12).keys()].map(i => decoration(i)) }
                </g>
            </svg>

        </div>
    )
}

const decoration = (i) => {
    return <line x1='100' y1='30' x2='100' y2='40' style={{stroke: "#ffffff"}} transform={`rotate(${i * 30} 100 100)`} key={i}></line>
}