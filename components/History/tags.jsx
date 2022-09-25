import Tag from './tag'
import styles from './tags.module.scss'

export default function Tags({ style, items }) {
  return (items &&
    <div
      className={style}
    >
      <menu
        className={styles.list}
        id="history-texts"
      >
        { items.map(item => (
          <Tag
            key={item.slug || item.id}
            item={item}
          />
        ))}
      </menu>
    </div>
  )
}
