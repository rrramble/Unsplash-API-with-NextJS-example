import Tag from './tag'
import styles from './tags.module.scss'

export default function Tags({ items }) {
  if (!items || !items.length) {
    return null
  }

  return (
    <menu
      className={styles.self}
      id="history-texts"
    >
      {
        items.map(item => (
          <Tag
            key={item.slug || item.id}
            item={item}
          />
        ))
      }
    </menu>
  )
}
