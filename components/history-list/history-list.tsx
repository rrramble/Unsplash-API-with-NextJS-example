import ListItem from '@/components/list-item/list-item'
import { AppRoute } from 'consts/consts'
import styles from './history-list.module.scss'
import { HistoryEntries } from 'types/history'

type HistoryListProps = {
  items: HistoryEntries,
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
