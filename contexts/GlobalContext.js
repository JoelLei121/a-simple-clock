import { createContext } from "react";

/* current time mock data */
export const CurrentTimeContext = createContext({ hour: 0, minute: 0, second: 0}); 


/* current functioning state: NORMAL, STOPWATCH, TIMER */
export const CurrentStateContext = createContext('NORMAL');