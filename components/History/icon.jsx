import { useEffect, useRef } from 'react'
import styles from './icon.module.scss'

export default function Icon({
  className,
  dataTest,
  isHidden,
  onClick,
  passRef,
}) {
  const iconRef = useRef()

  useEffect(() => passRef && passRef(iconRef))

  return (
    <div
      className={className}
      data-test={dataTest}
    >
      <button
        type="button"
        className={styles.self + ' ' + (isHidden ? styles['self--hidden'] : '')}
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
