import ListItem from '@/components/list-item/list-item'
import { AppRoute } from 'consts/consts'
import { SearchTopic, SearchTopics } from 'types/search-tags'
import styles from './search-list.module.scss'

type TagsProps = {
  isFull: boolean,
  items: SearchTopics,
  onClick: (_tag: SearchTopic) => void,
}

export default function Tags({ items, isFull, onClick }: TagsProps) {
  const additionalClassName = isFull ?
    styles['self--full'] :
    styles['self--minimized']

  return (
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
          {items.map(({ slug, title }) => (
            <li
              className={styles['item-container']}
              key={slug}
            >
              <ListItem
                className={styles.item}
                link={`${AppRoute.Topics}${slug}`}
                text={title}
                onClick={() => onClick({ slug, title, id: '' })}
              />
            </li>
          ))}
        </menu>
      </div>
    </>
  )
}