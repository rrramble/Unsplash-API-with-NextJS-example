import { ReactNode } from 'react'
import styles from './menu-modal.module.scss'

type MenuModalProps = {
  children: ReactNode,
  className: string,
  isHidden: boolean,
  isFullHeight: boolean,
}

export default function MenuModal(props: MenuModalProps) {
  const additionalClassNames = props.isHidden ?
    styles['self--hidden'] :
    props.isFullHeight ?
      styles['self--fill-window'] :
      ''

  return (
    <div
      className={props.className}
    >
      <div
        className={styles.self + ' ' + additionalClassNames}
      >
        {props.children}
      </div>
    </div>
  )
}
