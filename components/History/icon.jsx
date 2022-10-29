import { useEffect, useRef } from 'react'
import styles from './icon.module.scss'

export default function Icon({ dataTest, className, onClick, passRef }) {
  const iconRef = useRef()

  useEffect(() => passRef && passRef(iconRef))

  return (
    <div
      className={className}
      data-test={dataTest}
    >
      <button
        type="button"
        className={styles.self}
        onClick={onClick}
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
