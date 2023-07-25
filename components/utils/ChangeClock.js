import { useEffect,useState } from "react";
import DigitalClock from "../DigitalClock";


export default function ChangeClock({initTime={ hour: 1, minute: 10, second: 30}, scale=1 }) {
    const [time, setTime] = useState(initTime);
    const [dragging, setDragging] = useState(false);
    const [target, setTarget] = useState(0);

    const Hand={
      second: 1,
      minute: 2,
      hour: 3
    }

    function positionToAngle(x,y){
      //计算两个向量的夹角
      return Math.atan2(y+100,x+100)*180/Math.PI
    }

    function handleMouseDown(ev){
      console.log("mouse down")
        // console.log(ev.target.getAttribute("id"))
        // if(ev.target.getAttribute("id") == "hourhand"){
        //     setDragging(true)
        //     setTarget(Hand.hour)
        // }
        // else if(ev.target.getAttribute("id") == "minutehand"){
        //     setDragging(true)
        //     setTarget(Hand.minute)
        // }
        // else if(ev.target.getAttribute("id") == "secondhand"){  
        //     setDragging(true)
        //     setTarget(Hand.second)
        // }
    }

    function handleMouseMove(ev){
        console.log("mouse move")
        console.log(dragging)
        let angle=0
        if(dragging){
            angle=positionToAngle(ev.clientX,ev.clientY)
            console.log(angle)
        }
    }

    function stopDragging(){
      console.log("stop dragging")
      setDragging(false)
      setTarget(0)
    }

    function handleMouseUp(ev){
      console.log("mouse up")
    }
    

    return (
        <div style={{display:"flex", flexDirection:"column", width: `${200*scale}px`, height: `${200*scale}px` }} 
          onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <svg width='100%' height='100%' viewBox="0 0 200 200" >
                <g>
                    <circle id="circle" style={{stroke: "#FFF", strokeWidth: "12px", fill:"#20B7AF"}} cx="100" cy="100" r="80"></circle>
                </g>
                <g>
                    <line x1="100" y1="100" x2="100" y2="55" transform={`rotate(${time.hour*15} 100 100)`} style={{strokeWidth: "3px", stroke: "#fffbf9"}} id="hourhand">
                    </line>
                    <line x1="100" y1="100" x2="100" y2="40" transform={`rotate(${time.minute*6} 100 100)`} style={{strokeWidth: "4px", stroke: "#fdfdfd"}} id="minutehand">
                    </line>
                    <line x1="100" y1="100" x2="100" y2="30" transform={`rotate(${time.second*6} 100 100)`} style={{strokeWidth: "2px", stroke: "#C1EFED"}} id="secondhand">
                    </line>
                </g>
                <circle id="center" style={{fill:"#128A86", stroke: "#C1EFED", strokeWidth: "2px"}} cx="100" cy="100" r="3"></circle>

                <g>
                    { [...Array(12).keys()].map(i => decoration(i)) }
                </g>
            </svg>
            <DigitalClock time={time} scale={scale}/>
        </div>
    )
}

const decoration = (i) => {
    return <line x1='100' y1='30' x2='100' y2='40' style={{stroke: "#ffffff"}} transform={`rotate(${i * 30} 100 100)`} key={i}></line>
}