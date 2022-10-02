import { useRef } from 'react'

import styles from './icon.module.scss'

export default function Icon({ style, onClick }) {
  const iconRef = useRef()

  return (
    <div
      className={style}
    >
      <button
        className={styles.self}
        onClick={() => onClick(iconRef)} // TODO: send Ref one time
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
