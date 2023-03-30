import { MouseEventHandler } from 'react'
import styles from './icon.module.scss'

type IconProps = {
  className: string,
  isHidden: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
}

export default function Icon(props: IconProps): JSX.Element {
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
