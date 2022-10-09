import { useEffect, useRef } from 'react'

import styles from './search-input.module.scss'

export default function SearchInput({ style, passRef }) {
  const inputRef = useRef(null)

  useEffect(() => passRef(inputRef))

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
        ref={inputRef}
        size="10"
        type="text"
      >
      </input>
    </div>
  )
}
