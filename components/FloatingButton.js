

export default function FloatingButton({style, handleClick}) {

    const radius = 25;
    return (
        <svg width={radius*2} height={radius*2} style={{...style, position: "absolute", zIndex: 10}} onClick={handleClick}>        
            <g>
                {/* <circle id="shadow" style={{fill:"rgba(0,0,0,0.1)"}} cx="97" cy="100" r="87" filter="url(#innerShadow)"></circle> */}
                <circle id="circle" style={{fill:"#D71313"}} cx={radius} cy={radius} r={radius}></circle>
            </g>
            <g>
                <line x1={radius} y1={radius * 1.5} x2={radius} y2={radius * 0.5} style={{strokeWidth: "3px", stroke: "#F0DE36"}}></line>
                <line x1={radius} y1={radius * 1.5} x2={radius} y2={radius * 0.5} transform={`rotate(90, ${radius}, ${radius})`} style={{strokeWidth: "3px", stroke: "#F0DE36"}}></line>
            </g>
        </svg>
    )
}