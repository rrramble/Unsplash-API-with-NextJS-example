import { useEffect, useRef } from 'react'

import Tags from './tags'
import styles from './history.module.scss'

export default function History({ isShown, items, onBlurForm, onClick, passRef }) {
  const ref = useRef()

  useEffect(() => {
    passRef(ref)
  })

  return (
    <form
      className={styles.self + ' ' + (isShown ? styles['self--shown'] : styles['self--hidden'])}
      data-test="menu-history__modal"
      onBlur={onBlurForm}
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
