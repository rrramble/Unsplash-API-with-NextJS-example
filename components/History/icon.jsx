import { useEffect, useRef } from 'react'
import styles from './icon.module.scss'

export default function Icon({ style, passRef }) {
  const iconRef = useRef()

  useEffect(() => passRef(iconRef))

  return (
    <div
      className={style}
    >
      <button
        type="button"
        className={styles.self}
        ref={iconRef}
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
