import styles from './search-input.module.scss'

export default function SearchInput({ style, inputRef }) {
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
