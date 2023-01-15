import { useEffect, useRef } from 'react'
import { contains } from '@/utils/helper-browser'

import Tags from './tags'
import styles from './history.module.scss'

export default function History({
  isFirstFocused,
  isHidden,
  items,
  onBlur,
  onClick,
  passRef,
}) {
  const ref = useRef()

  useEffect(() => {
    passRef && passRef(ref)
  })

  return (
    <form
      className={styles.self + ' ' + (isHidden ? styles['self--hidden'] : styles['self--shown'])}
      data-test="menu-history__modal"
      onBlur={isRelatedTargetInsideComponent(onBlur)}
      ref={ref}
    >
      <header
        className={styles.header}
      >
        Ваши запросы
      </header>
      <Tags
        isFirstFocused={isFirstFocused}
        items={items}
        onClick={onClick}
      />
    </form>
  )
}

function isRelatedTargetInsideComponent(callback) {
  return e => {
    !contains(e.currentTarget, e.relatedTarget) && callback(e)
  }
}
