import styles from './icon.module.scss'

export default function Icon({ style }) {
  return (
    <div
      className={style}
    >
      <button
        type="button"
        className={styles.self}
      >
        <span
          className={styles.title}
        >
          История поиска
        </span>
      </button>
    </div>
  )
}
