import { useEffect, useRef } from 'react'
import { contains } from '@/utils/helper-browser'

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
  const windowClickHandler = (evt) => {
    const { target } = evt
    if (!contains(ref.current, target) && !isHidden) {
      onBlur()
    }
  }

  useEffect(() => {
    window.addEventListener('click', windowClickHandler)
    return () => {
      window.removeEventListener('click', windowClickHandler)
    }
  })

  useEffect(() => {
    passRef && passRef(ref)
  }, [passRef, ref])

  const additionalClassName = isHidden ?
    styles['self--hidden'] :
    styles['self--shown']

  return (
    <div
      className={styles.self + ' ' + additionalClassName}
      data-test="menu-history__modal"
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
    </div>
  )
}
