import { ReactNode } from 'react'
import classNames from 'classnames'
import styles from './menu-modal.module.scss'

type MenuModalProps = {
  children?: ReactNode,
  dataTestId?: string,
  className: string,
  isFullHeight: boolean,
  isHidden: boolean,
}

export default function MenuModal(props: MenuModalProps): JSX.Element {
  if (props.isHidden) {
    return <></>
  }

  return (
    <div
      className={props.className}
      data-testid={props.dataTestId}
    >
      <div
        className={classNames(styles.self, {
          [ styles['self--fill-window'] ]: !props.isHidden && props.isFullHeight,
        })}
      >
        {props.children}
      </div>
    </div>
  )
}
