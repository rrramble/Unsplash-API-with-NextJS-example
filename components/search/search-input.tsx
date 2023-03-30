import { MutableRefObject, useEffect, useRef } from 'react'
import styles from './search-input.module.scss'

type SearchInputProps = {
  passRef: (ref: MutableRefObject<HTMLInputElement>) => void;
}

export default function SearchInput({ passRef }: SearchInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null)

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
        size={10}
        type="text"
      >
      </input>
    </div>
  )
}
