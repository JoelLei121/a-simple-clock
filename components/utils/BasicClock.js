import { useEffect, useState } from "react";

var intervalId;
export default function BasicClock({ time, initTime={ hour: 0, minute: 0, second: 0} }) {

    const hour = time.hour;
    const minute = time.minute;
    const second = time.second;
    
    return (
        <svg width="200" height="200">
        
            {/* <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                <feOffset in="blur" dx="2.5" dy="2.5"/>
            </filter> */}
        
            <g>
                {/* <circle id="shadow" style={{fill:"rgba(0,0,0,0.1)"}} cx="97" cy="100" r="87" filter="url(#innerShadow)"></circle> */}
                <circle id="circle" style={{stroke: "#FFF", strokeWidth: "12px", fill:"#20B7AF"}} cx="100" cy="100" r="80"></circle>
            </g>
            <g>
                <line x1="100" y1="100" x2="100" y2="55" transform={`rotate(${(initTime.hour + hour)*15} 100 100)`} style={{strokeWidth: "3px", stroke: "#fffbf9"}} id="hourhand">
                </line>
                <line x1="100" y1="100" x2="100" y2="40" transform={`rotate(${(initTime.minute + minute)*6} 100 100)`} style={{strokeWidth: "4px", stroke: "#fdfdfd"}} id="minutehand">
                </line>
                <line x1="100" y1="100" x2="100" y2="30" transform={`rotate(${(initTime.second + second)*6} 100 100)`} style={{strokeWidth: "2px", stroke: "#C1EFED"}} id="secondhand">
                </line>
            </g>
            <circle id="center" style={{fill:"#128A86", stroke: "#C1EFED", strokeWidth: "2px"}} cx="100" cy="100" r="3"></circle>

            <g>
                { [...Array(12).keys()].map(i => decoration(i)) }
            </g>
        </svg>
    )
}

const decoration = (i) => {
    return <line x1='100' y1='30' x2='100' y2='40' style={{stroke: "#ffffff"}} transform={`rotate(${i * 30} 100 100)`}></line>
}