import { useRef } from 'react'

import styles from './icon.module.scss'

export default function Icon({ style, onClick }) {
  const buttonRef = useRef(null)

  return (
    <div
      className={style}
    >
      <button
        type="button"
        className={styles.self}
        onClick={() => onClick(buttonRef)}
        ref={buttonRef}
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
