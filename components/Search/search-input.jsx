import { useEffect, useRef } from 'react'

import styles from './search-input.module.scss'

export default function SearchInput({ passRef }) {
  const inputRef = useRef(null)

  useEffect(() => {
    passRef && passRef(inputRef)
  }, [passRef, inputRef])

  return (
    <div
      className={styles.self}
      data-test="menu-search__input-container"
    >
      <label
        className="visually-hidden"
        htmlFor="topic-search">Поиск
      </label>
      <input
        className={styles.input}
        id="text"
        name="text"
        placeholder="Поиск"
        ref={inputRef}
        size="10"
        type="text"
      >
      </input>
    </div>
  )
}
