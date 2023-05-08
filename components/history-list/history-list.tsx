import ListItem from '@/components/list-item/list-item'
import { AppRoute } from 'consts/consts'
import { HistoryEntry } from 'types/history'
import styles from './history-list.module.scss'

type HistoryListProps = {
  items: HistoryEntry[] | null,
}

export default function HistoryList({ items }: HistoryListProps) {
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
