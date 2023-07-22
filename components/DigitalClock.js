import styles from "../styles/DigitalClock.module.css";

export default function DigitalClock({ time={ hour: 0, minute: 0, second: 0 } }) {

    return (
        <svg viewBox="0 0 63 13" width={200} className={styles.DigitalClock}>
            <Digital x={0} value={Math.floor(time.hour / 10)} />
            <Digital x={10} value={Math.floor(time.hour % 10)} />
            <Dots x={20}/>
            <Digital x={23} value={Math.floor(time.minute / 10)} />
            <Digital x={33} value={Math.floor(time.minute % 10)} />
            <Dots x={43} />
            <Digital x={46} value={Math.floor(time.second / 10)} />
            <Digital x={56} value={Math.floor(time.second % 10)} />
        </svg>
    )
}

function Digital({ x, value=0 }) {

    const res = [
        [1,1,1,1,1,1,0], // 0
        [0,1,1,0,0,0,0], // 1
        [1,1,0,1,1,0,1], // 2
        [1,1,1,1,0,0,1], // 3
        [0,1,1,0,0,1,1], // 4
        [1,0,1,1,0,1,1], // 5
        [1,0,1,1,1,1,1], // 6
        [1,1,1,0,0,0,0], // 7
        [1,1,1,1,1,1,1], // 8
        [1,1,1,1,0,1,1], // 9
    ];

    let finalStyle = [];
    for(let i = 0; i < 7; i++) {
        let temp = [0,0,0,0,0,0,0];
        temp = res[value];
        if(temp != undefined && temp[i]) {
            finalStyle.push(styles.dump);
        } else {
            finalStyle.push(styles.disable);
        }
    }

    return (
        <g transform={`translate(${x} 0)`}>
            <path id="a" d="M1 0 L2 1 L5 1 L6 0 L1 0 Z" className={finalStyle[0]} ></path>
            <path id="b" d="M6 2 L7 1 L7 6 L6 5 L6 2 Z" className={finalStyle[1]}></path>
            <path id="c" d="M6 11 L7 12 L7 7 L6 8 L6 11 Z" className={finalStyle[2]}></path>
            <path id="d" d="M1 13 L2 12 L5 12 L6 13 L1 13 Z" className={finalStyle[3]}></path>
            <path id="e" d="M0 7 L1 8 L1 11 L0 12 L0 7 Z" className={finalStyle[4]}></path>
            <path id="f" d="M0 1 L1 2 L1 5 L0 6 L0 1 Z" className={finalStyle[5]}></path>
            <path id="g" d="M1 6.5 L2 6 L5 6 L6 6.5 L5 7 L2 7 L1 6.5 Z" className={finalStyle[6]}></path>
        </g>
    )
}

function Dots({ x }) {
    return (
        <g>
            <circle cx={x} cy={4} r={0.7} style={{fill: "#000"}}></circle>
            <circle cx={x} cy={8} r={0.7} style={{fill: "#000"}}></circle>
        </g>
    )
}