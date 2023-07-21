import styles from "../styles/ClockList.module.css";

export default function ClockList({ children }) {

    return (
        <div className={styles.clockList}>
            { children }
        </div>
    )
}