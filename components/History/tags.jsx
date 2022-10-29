import Tag from './tag'
import styles from './tags.module.scss'

export default function Tags({ style, items }) {
  return (items &&
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
      ))}
    </menu>
  )
}
