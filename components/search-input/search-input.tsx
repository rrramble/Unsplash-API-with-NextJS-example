import { ChangeEvent } from 'react'
import styles from './search-input.module.scss'

type SearchInputProps = {
  onChange: (_text: string) => void,
  text: string,
}

export default function SearchInput({ onChange, text }: SearchInputProps): JSX.Element {
  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value)
  }

  return (
    <div
      className={styles.self}
      data-test="menu-search__input-container"
    >
      <label
        className="visually-hidden"
        htmlFor="topic-search-input">Поиск
      </label>
      <input
        className={styles.input}
        id="topic-search-input"
        name="text"
        onChange={handleInputChange}
        placeholder="Поиск"
        size={10}
        type="text"
        value={text}
      >
      </input>
    </div>
  )
}
