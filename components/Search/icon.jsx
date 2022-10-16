import { useEffect, useRef } from 'react'

import styles from './icon.module.scss'

export default function Icon({ isHidden, onClick, passRef }) {
  const iconRef = useRef()

  useEffect(() => passRef(iconRef), [])

  return (
    <button
      className={styles.self + ' ' + (isHidden ? styles['self--hidden'] : '')}
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
  )
}
