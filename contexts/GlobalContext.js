import { createContext } from "react";

/* current time mock data */
export const CurrentTimeContext = createContext({ 
    currentTime: { hour: 0, minute: 0, second: 0}, 
    setCurrentTime: () => {} 
}); 


/* current functioning state: NORMAL, STOPWATCH, TIMER */
export const CurrentStateContext = createContext('NORMAL');

/* current clock style: BASIC, ROMAN, PLATE */
export const CurrentStyleContext = createContext('BASIC');


/* alarm time controller, use for setting alarm. { time, setTime,  } */
export const AlarmTimeContext = createContext({
    alarmTime: { hour: 0, minute: 0, second: 0}, 
    setAlarmTime: ()=>{}, 
    alarmTitle: "", 
    setAlarmTitle: ()=>{}
});
