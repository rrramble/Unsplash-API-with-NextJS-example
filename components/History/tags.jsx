import Tag from './tag'
import styles from './tags.module.scss'

export default function Tags({ isFirstFocused, items }) {

  return (items &&
    <menu
      className={styles.self}
      id="history-texts"
    >
      {
        items.map((item, index) => (
        <Tag
          isFocused={isFirstFocused && index === 0}
          key={item.slug || item.id}
          item={item}
        />
      ))}
    </menu>
  )
}
