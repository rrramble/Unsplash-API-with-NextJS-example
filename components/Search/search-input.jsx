import { useRef, useEffect } from 'react'
import styles from './search-input.module.scss'

export default function SearchInput({ style, isFocused, cb }) {
  const inputEl = useRef(null)
  useEffect(() => {
    if (!isFocused) {
      return
    }
    debugger
    inputEl.current.focus()
    (typeof cb === 'function') && cb()
  }, [isFocused, cb])

  return (
    <div
      className={style}
    >
      <label
        className="visually-hidden"
        htmlFor="topic-search">Поиск
      </label>
      <input
        className={styles.self}
        id="topic-search"
        name="topic-search"
        placeholder="Поиск"
        ref={inputEl}
        size="10"
        type="text"
      >
      </input>
    </div>
  )
}
