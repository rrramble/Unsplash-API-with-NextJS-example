import styles from './menu-modal.module.scss'

export default function MenuModal({ children, isHidden, isFullHeight }) {
  const classNames =
    styles.self + ' ' +
    (isHidden ? styles['self--hidden'] :
      isFullHeight ? styles['self--fill-window'] : ''
    )

  return (
    <div
      className={classNames}
    >
      {children}
    </div>
  )
}
