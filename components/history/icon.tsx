import { MutableRefObject, useEffect, useRef } from 'react'
import styles from './icon.module.scss'

type IconProps = {
  className: string,
  isHidden: boolean,
  onClick: () => void,
  passRef: (ref: MutableRefObject<HTMLButtonElement> | null) => void,
}

export default function Icon(props: IconProps) {
  const iconRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => props.passRef && props.passRef(iconRef))

  return (
    <div
      className={props.className}
      data-test="menu-history"
    >
      <button
        aria-haspopup="true"
        type="button"
        className={styles.self + ' ' + (props.isHidden ? styles['self--hidden'] : '')}
        onClick={props.onClick}
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
