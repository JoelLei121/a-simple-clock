import React, { useState, useEffect } from "react";

export default function Alarm({ url }) {
    // const [turnOn, turnOff] = useAudio(url);

    // useEffect(() => {
    //     console.log(status);
    //     if(status==="alarm"){turnOn();}
    //     else{turnOff();}
    // }, [status]);
    // useEffect(() => {
    //     turnOn();
    //     return () => {
    //         turnOff();
    //     }
    // }, [])

    return (
        <audio autoPlay loop>
            <source src={url} type="audio/mp3"/>
        </audio>
    )

};

// const useAudio = (url) => {
//     const audio = new Audio(url);
//     const [playing, setPlaying] = useState(false);

//     const turnOn = () => { setPlaying(true); console.log("turn on clock"); };
//     const turnOff = () => { setPlaying(false); console.log("turn off clock"); };
//     const release = () => { audio.desto}

//     useEffect(() => {
//         playing ? audio.play() : audio.pause();
//     }, [playing]);

//     useEffect(() => {
//         audio.addEventListener('ended', () => setPlaying(false));
//         return () => {
//             audio.removeEventListener('ended', () => setPlaying(false));
//         };
//     }, []);

//     return [turnOn, turnOff, release];
// };
