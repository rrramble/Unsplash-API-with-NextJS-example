import Tag from './tag'

import styles from './tags.module.scss'

export default function Tags({ topics, style, isFull }) {
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
        {topics.map(topic => (
          <li
            className={styles['item-container']}
            key={topic.slug}
          >
            <Tag
              link={'/topic/' + topic.slug}
              text={topic.title}
            />
          </li>
        ))}
      </menu>
    </div>
  )
}
