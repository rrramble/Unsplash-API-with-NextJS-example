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
        data-test="menu-search__icon"
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
