import { useRef } from 'react'
import styles from './search-input.module.scss'

type SearchInputProps = {
  onChange: (_text: string) => void,
  text: string,
}

export default function SearchInput({ onChange, text }: SearchInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = () => {
    onChange(inputRef.current?.value ?? '')
  }

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
        onChange={handleInputChange}
        placeholder="Поиск"
        ref={inputRef}
        size={10}
        type="text"
        value={text}
      >
      </input>
    </div>
  )
}
