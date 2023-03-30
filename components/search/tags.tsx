import Tag from './tag'
import { SearchTag, SearchTags } from 'types/search-tags'
import styles from './tags.module.scss'

type TagsProps = {
  isFull: boolean,
  items: SearchTags,
  onClick: (tag: SearchTag) => void,
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
                link={'/topic/' + slug}
                text={title}
                cb={() => onClick({ slug, title })}
              />
            </li>
          ))}
        </menu>
      </div>
    </>
  )
}
