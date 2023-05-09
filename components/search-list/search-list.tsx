import ListItem from '@/components/list-item/list-item'
import { AppRoute } from 'consts/consts'
import { SearchTopic, SearchTopics } from 'types/search-tags'
import styles from './search-list.module.scss'

type SearchListProps = {
  isFull: boolean,
  items: SearchTopics,
  onSearchTopicClick: (_tag: SearchTopic) => void,
}

export default function SearchList({ items, isFull, onSearchTopicClick }: SearchListProps) {
  const additionalClassName = isFull ?
    styles['self--full'] :
    styles['self--minimized']

  return (items &&
    <>
      <header
        className="visually-hidden"
      >
        Темы фотографий:
      </header>

      <div
        className={styles.shadow}
      >
        <menu
          className={styles.self + ' ' + additionalClassName}
          data-test={"menu-search__topic-list"}
          id="search-tags"
        >
          {items.map((item) => (
            <li
              className={styles['item-container']}
              key={item.slug}
            >
              <ListItem
                className={styles.item}
                link={`${AppRoute.Topics}${item.slug}`}
                text={item.title}
                onClick={() => onSearchTopicClick(item)}
              />
            </li>
          ))}
        </menu>
      </div>
    </>
  )
}
