import { MutableRefObject, useEffect, useRef } from 'react'
import styles from './icon.module.scss'

type IconProps = {
  className: string,
  isHidden: boolean,
  onClick: () => void,
  passRef: (ref: MutableRefObject<HTMLButtonElement> | null) => void,
}

export default function Icon(props: IconProps): JSX.Element {
  const { passRef } = props
  const iconRef = useRef()

  useEffect(
      () => passRef && passRef(iconRef),
      [iconRef, passRef]
  )

  return (
    <div
      className={props.className}
      data-test="menu-search"
      id="search"
    >
      <button
        aria-haspopup="true"
        className={styles.self + ' ' + (props.isHidden ? styles['self--hidden'] : '')}
        data-test="menu-search__icon"
        onClick={props.onClick}
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
