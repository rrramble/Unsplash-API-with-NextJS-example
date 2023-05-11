import { MouseEventHandler } from 'react'
import styles from './nav-button.module.scss'

type NavButtonProps = {
  className: string,
  dataTestId?: string,
  isHidden: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
  title: string,
  wrapperClassName: string,
}

export default function NavButton(props: NavButtonProps): JSX.Element {
  return (
    <div
      className={props.wrapperClassName}
    >
      <button
        aria-haspopup="true"
        aria-hidden={props.isHidden}
        className={`${styles.self} ${props.className} ${props.isHidden ? styles['self--hidden'] : ''}`}
        data-testid={props.dataTestId}
        onClick={props.onClick}
        type="button"
      >
        <span
          className={styles.title}
        >
          {props.title}
        </span>
      </button>
    </div>
  )
}
