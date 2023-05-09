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
          const { slug, title } = item
          const link = slug === undefined ?
            `${AppRoute.Search}/${encodeURIComponent(title)}` :
            `${AppRoute.Topics}${encodeURIComponent(slug)}`

          return (
            <ListItem
              className={styles.item}
              key={item.id ?? item.slug ?? item.title}
              link={link}
              text={item.title}
            />
          )
        })
      }
    </menu>
  )
}
