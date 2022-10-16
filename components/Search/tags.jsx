import Tag from './tag'

import styles from './tags.module.scss'

export default function Tags({ topics, isFull, onClick }) {
  const listStyle = styles.self + ' ' +
    (isFull ? styles['self--full'] : styles['self--minimized'])

  return (topics &&
    <>
      <header
          aria-label="Available photos by topic:"
          className="visually-hidden"
        >
          <b>Другие темы фотографий:</b>
      </header>

      <menu
        className={listStyle}
        data-test={"menu-search__topic-list"}
        id="search-tags"
      >
        {topics.map(({ slug, title }) => (
          <li
            className={styles['item-container']}
            key={slug}
          >
            <Tag
              link={'/topic/' + slug}
              text={title}
              cb={() => onClick({ slug, title })}
            />
          </li>
        ))}
      </menu>
    </>
  )
}
