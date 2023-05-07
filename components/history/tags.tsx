import { HistoryEntry } from 'types/history'
import Tag from './tag'
import styles from './tags.module.scss'
import ListItem from '../list-item/list-item'
import { AppRoute } from 'consts/consts'

type TagsProps = {
  items: HistoryEntry[] | null,
}

export default function Tags({ items }: TagsProps) {
  if (!items || !items.length) {
    return null
  }

  return (
    <menu
      className={styles.self}
      id="history-texts"
    >
      {
        items.map(item => {
          const link = item.slug ?
            `${AppRoute.Topics}${encodeURI(item.slug)}` :
            `${AppRoute.Search}/${encodeURI(item.title)}`

          return (
            <ListItem
              className={styles.item}
              key={item.slug || item.id}
              link={link}
              text={item.title}
            />
          )
        })
      }
    </menu>
  )
}
