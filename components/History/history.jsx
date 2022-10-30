import { useEffect, useRef } from 'react'

import Tags from './tags'
import styles from './history.module.scss'

export default function History({
  isHidden,
  items,
  onBlur,
  onClick,
  passRef,
}) {
  const ref = useRef()

  useEffect(() => {
    passRef(ref)
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

// TODO: move to its own library
function contains (parent, item) {
  if (parent === undefined || item === undefined || item === null) {
    return false
  }

  if (parent === item) {
    return true
  }

  const { parentNode: itemParentNode } = item
  return contains(parent, itemParentNode)
}
