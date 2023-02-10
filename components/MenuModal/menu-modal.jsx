import styles from './menu-modal.module.scss'

export default function MenuModal({
  children,
  className,
  isHidden,
  isFullHeight,
}) {
  const additionalClassNames = isHidden ?
    styles['self--hidden'] :
    isFullHeight ?
      styles['self--fill-window'] :
      ''

  return (
    <div
      className={className}
    >
      <div
        className={styles.self + ' ' + additionalClassNames}
      >
        {children}
      </div>
    </div>
  )
}
