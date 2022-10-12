import { useEffect, useRef } from 'react'

import styles from './icon.module.scss'

export default function Icon({ style, onClick, passRef }) {
  const iconRef = useRef()

  useEffect(() => passRef(iconRef), [])

  return (
    <div
      className={style}
    >
      <button
        className={styles.self}
        onClick={onClick}
        ref={iconRef}
        type="button"
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
