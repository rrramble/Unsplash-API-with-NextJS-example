import { SearchTopic, SearchTopics } from 'types/search-tags'
import Tag from './tag'
import styles from './tags.module.scss'
import classNames from 'classnames'

type TagsProps = {
  isFull: boolean,
  items: SearchTopics,
  onClick: (tag: SearchTopic) => void,
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
                link={'/topic/' + slug}
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
