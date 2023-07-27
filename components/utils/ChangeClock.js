import { useEffect,useState,useRef } from "react";
import DigitalClock from "../DigitalClock";
import styles from "../../styles/ChangeClock.module.css";
import BasicClock from "./BasicClock";


export default function ChangeClock({initTime={hour:0,minute:0,second:0}, scale=1, confirmTime, cancel}) {

  //test
    const center=useRef({x:0,y:0})
    const [time, setTime] = useState(initTime);
    const [dragging, setDragging] = useState(false);
    const [target, setTarget] = useState(0);

    const Hand={
      second: 1,
      minute: 2,
      hour: 3
    }

    useEffect(()=>{
      let chg=document.getElementById("changeClock")
      let circle=chg.querySelector("#circle")
      let rect=circle.getBoundingClientRect()
      center.current.x=(rect.left+rect.right)/2
      center.current.y=(rect.top+rect.bottom)/2
    },[])

    function handleMouseDown(ev){
      if(ev.target.getAttribute("id") == "hourhand"){
          setDragging(true);
          setTarget(Hand.hour);
      }
      else if(ev.target.getAttribute("id") == "minutehand"){
          setDragging(true);
          setTarget(Hand.minute);
      }
      else if(ev.target.getAttribute("id") == "secondhand"){  
          setDragging(true);
          setTarget(Hand.second);
      }
    }

    function handleMouseMove(ev){
      if(dragging){
        let angle=positionToAngle(ev.clientX,ev.clientY);

        if(target==Hand.second){
          setTime({...time,second:angle/6})
        }
        else if(target==Hand.minute){
          setTime({...time,minute:angle/6})
        }
        else if(target==Hand.hour){
          setTime({...time,hour:angle/30})
        }
      }
    }

    function stopDragging(ev){
      setDragging(false)
      setTarget(0)
    }

    function positionToAngle(x,y){
      //鼠标与时钟中心点x轴正向的夹角（-180,180）
      let angle=Math.atan2(center.current.y-y,x-center.current.x)*180/Math.PI
      //转换为时钟坐标系下的夹角（0,360）
      angle=90-angle
      if(angle<0){
        angle+=360
      } 
      return angle
    }
    
    return (
        <div id="changeClock" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging}>
          <BasicClock time={time} scale={scale}/>
          <div style={{display:"flex", flexDirection:"column",alignContent:"center",alignItems:"center"}}>
            <DigitalClock time={time} scale={scale}/>
            <div>
              <input className={styles.input} type="number" min="0" max="23" step="1" value={Math.floor(time.hour)} 
                onChange={(e)=>{setTime({...time,hour:Number(e.target.value)})}
              } />
              <span>:</span>
              <input className={styles.input} type="number" min="0" max="59" step="1" value={Math.floor(time.minute)} 
                onChange={(e)=>{setTime({...time,minute:Number(e.target.value)})}
              } />
              <span>:</span>
              <input className={styles.input} type="number" min="0" max="59" step="1" value={Math.floor(time.second)} 
                onChange={(e)=>{setTime({...time,second:Number(e.target.value)})}
              } />
            </div>
            <div style={{justifyItems:"center"}}>
              <button className={styles.button} style={{backgroundColor:"#3aac3c"}} onClick={()=>confirmTime(time)}>确认</button>
              <button className={styles.button} style={{backgroundColor:"#c9295e"}} onClick={()=>cancel()}>取消</button>
            </div>
          </div>
        </div>
    )
}

const decoration = (i) => {
    return <line x1='100' y1='30' x2='100' y2='40' style={{stroke: "#ffffff"}} transform={`rotate(${i * 30} 100 100)`} key={i}></line>
}