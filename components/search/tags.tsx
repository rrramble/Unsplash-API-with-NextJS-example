import { SearchTopic, SearchTopics } from 'types/search-tags'
import Tag from './tag'
import { AppRoute } from 'consts/consts'
import styles from './tags.module.scss'

type TagsProps = {
  isFull: boolean,
  items: SearchTopics,
  onClick: (_tag: SearchTopic) => void,
}

export default function Tags({ items, isFull, onClick }: TagsProps) {
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
          {items.map(({ slug, title }) => (
            <li
              className={styles['item-container']}
              key={slug}
            >
              <Tag
                link={`${AppRoute.Topics}${slug}`}
                text={title}
                cb={() => onClick({ slug, title, id: '' })}
              />
            </li>
          ))}
        </menu>
      </div>
    </>
  )
}
