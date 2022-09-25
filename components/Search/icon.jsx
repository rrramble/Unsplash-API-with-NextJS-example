import styles from './icon.module.scss'

export default function Icon({ style, onClick }) {
  return (
    <div
      className={style}
    >
      <button
        type="button"
        className={styles.self}
        onClick={onClick}
      >
        <span
          className={styles.title}
        >
          Поиск
        </span>
      </button>
    </div>
  )
}
