import { SearchTopic, SearchTopics } from 'types/search-tags'
import classNames from 'classnames'
import Tag from './tag'
import { AppRoute } from 'consts/consts'
import styles from './tags.module.scss'

type TagsProps = {
  isFull: boolean,
  items: SearchTopics,
  onClick: (_tag: SearchTopic) => void,
}

export default function Tags({ items, isFull, onClick }: TagsProps) {
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
          className={classNames(styles.self, {
            [ styles['self--full'] ]: isFull,
            [ styles['self--minimized'] ]: !isFull,
          })}
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
