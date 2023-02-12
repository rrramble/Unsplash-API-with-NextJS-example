import Tag from './tag'

import styles from './tags.module.scss'

export default function Tags({ items, isFull, onClick }) {
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
