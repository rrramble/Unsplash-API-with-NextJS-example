import { MouseEventHandler } from 'react'
import styles from './icon.module.scss'

type IconProps = {
  className: string,
  isHidden: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
}

export default function Icon(props: IconProps) {
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
