import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const turnOn = () => {setPlaying(true);console.log("turn on clock");};
  const turnOff = () => {setPlaying(false);console.log("turn off clock");};

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [turnOn, turnOff];
};

const Alarm = ({ url, status }) => {
  const [turnOn, turnOff] = useAudio(url);

  useEffect(() => {
    console.log(status);
    if(status==="alarm"){turnOn();}
    else{turnOff();}
  },
  [status]
);

};

export default Alarm;
