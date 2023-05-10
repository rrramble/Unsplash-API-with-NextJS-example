import { ReactNode } from 'react'
import classNames from 'classnames'
import styles from './menu-modal.module.scss'

type MenuModalProps = {
  children?: ReactNode,
  dataTestId?: string,
  className: string,
  isHidden: boolean,
  isFullHeight: boolean,
}

export default function MenuModal(props: MenuModalProps) {
  return (
    <div
      className={props.className}
      data-testid={props.dataTestId}
    >
      <div
        className={classNames(styles.self, {
          [ styles['self--hidden'] ]: props.isHidden,
          [ styles['self--fill-window'] ]: !props.isHidden && props.isFullHeight,
        })}
      >
        {props.children}
      </div>
    </div>
  )
}
