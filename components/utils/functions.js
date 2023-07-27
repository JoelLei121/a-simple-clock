export function stampToTime(stamp){
  return {hour:stamp/3600000,minute:stamp%3600000/60000,second:stamp%60000/1000}
}

export function timeToStamp(time){
  return Math.floor(Math.floor(time.hour)*3600000+Math.floor(time.minute)*60000+time.second*1000);
}