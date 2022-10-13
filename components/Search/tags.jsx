import Tag from './tag'

import styles from './tags.module.scss'

export default function Tags({ topics, style, isFull, onClick }) {
  const listStyle = styles.self + ' ' +
    (isFull ? styles['self--full'] : styles['self--minimized'])

  return (topics &&
    <div
      className={style}
    >
      <menu
        className={listStyle}
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
    </div>
  )
}
