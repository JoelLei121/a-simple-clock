import { useEffect,useState } from "react";
import DigitalClock from "../DigitalClock";
import styles from "../../styles/ChangeClock.module.css";


export default function ChangeClock({initTime={ hour: 1, minute: 10, second: 30}, scale=1 ,confirmTime, cancel}) {
    const [time, setTime] = useState(initTime);
    const [dragging, setDragging] = useState(false);
    const [target, setTarget] = useState(0);

    const Hand={
      second: 1,
      minute: 2,
      hour: 3
    }

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
        angle%=360;
        if(target==Hand.second){
          setTime({
            hour: time.hour,
            minute: time.minute,
            second: angle/6
          })
        }
        else if(target==Hand.minute){
          setTime({
            hour: time.hour,
            minute: angle/6,
            second: time.second
          })
        }
        else if(target==Hand.hour){
          setTime({
            hour: angle/30,
            minute: time.minute,
            second: time.second
          })
        }
      }
    }

    function stopDragging(ev){
      setDragging(false)
      setTarget(0)
    }

    function positionToAngle(x,y){
      //时钟中心点坐标
      let center=document.getElementById("center")
      let cx=(center.getBoundingClientRect().left+center.getBoundingClientRect().right)/2
      let cy=(center.getBoundingClientRect().top+center.getBoundingClientRect().bottom)/2
      //鼠标与时钟中心点x轴正向的夹角（-180,180）
      let angle=Math.atan2(cy-y,x-cx)*180/Math.PI
      //转换为时钟坐标系下的夹角（0,360）
      angle=90-angle
      if(angle<0){
        angle+=360
      } 
      return angle
    }
    
    return (
        <div style={{width: `${200*scale}px`, height: `${200*scale}px` }} 
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging}>
            <svg width='100%' height='100%' viewBox="0 0 200 200" >
                <g>
                    <circle id="circle" style={{stroke: "#FFF", strokeWidth: "12px", fill:"#20B7AF"}} cx="100" cy="100" r="80"></circle>
                </g>
                <g>
                    <line x1="100" y1="100" x2="100" y2="55" transform={`rotate(${time.hour%12*30} 100 100)`} style={{strokeWidth: "3px", stroke: "#fffbf9"}} id="hourhand">
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
            <div style={{display:"flex", flexDirection:"column",alignContent:"center",alignItems:"center"}}>
              <DigitalClock time={time} scale={scale}/>
              <div>
                <input className={styles.input} type="number" min="0" max="23" step="1" value={Math.floor(time.hour)} onChange={(e)=>{setTime({
                  hour: e.target.value,
                  minute: time.minute,
                  second: time.second
                })}
                } />
                <span>:</span>
                <input className={styles.input} type="number" min="0" max="59" step="1" value={Math.floor(time.minute)} onChange={(e)=>{setTime({  
                  hour: time.hour,
                  minute: e.target.value,
                  second: time.second
                })}
                } />
                <span>:</span>
                <input className={styles.input} type="number" min="0" max="59" step="1" value={Math.floor(time.second)} onChange={(e)=>{setTime({
                  hour: time.hour,
                  minute: time.minute,
                  second: e.target.value
                })}
                } />
              </div>
              <div style={{justifyItems:"center"}}>
                <button className={styles.button} style={{backgroundColor:"#3aac3c"}} onClick={()=>confirmTime(time)}>确认修改</button>
                <button className={styles.button} style={{backgroundColor:"#c9295e"}} onClick={()=>cancel()}>取消</button>
              </div>
            </div>
        </div>
    )
}

const decoration = (i) => {
    return <line x1='100' y1='30' x2='100' y2='40' style={{stroke: "#ffffff"}} transform={`rotate(${i * 30} 100 100)`} key={i}></line>
}