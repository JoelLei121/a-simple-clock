import { useState } from 'react'
import styles from '../styles/sample.module.css'

export default function SampleComponent({ message }) {
    const [clicks, setClicks] = useState(0);

    function handleClick() {
        setClicks(click => click + 1);
    }

    return (
        <>
            <h1 className={styles.test}>{message}</h1>
            <button onClick={handleClick}>{clicks}</button>
        </>
    )
}