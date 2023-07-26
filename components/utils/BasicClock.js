import { useEffect } from "react";

export default function BasicClock({timeStamp=0, scale=1}) {
    let hour=timeStamp/120000%12;
    let minute=(timeStamp%3600000)/10000;
    let second=(timeStamp%60000)/1000*6;

    return (
        <div style={{width: `${200*scale}px`, height: `${200*scale}px` }}>
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
                    <line x1="100" y1="100" x2="100" y2="55" transform={`rotate(${hour} 100 100)`} style={{strokeWidth: "3px", stroke: "#fffbf9"}} id="hourhand">
                    </line>
                    <line x1="100" y1="100" x2="100" y2="40" transform={`rotate(${minute} 100 100)`} style={{strokeWidth: "4px", stroke: "#fdfdfd"}} id="minutehand">
                    </line>
                    <line x1="100" y1="100" x2="100" y2="30" transform={`rotate(${second} 100 100)`} style={{strokeWidth: "2px", stroke: "#C1EFED"}} id="secondhand">
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