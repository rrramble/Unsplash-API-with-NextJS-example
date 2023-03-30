import Link from 'next/link'
import styles from './similar-tags.module.scss'

// FIXME: all types: create and import external!
type Links = {
  html: string,
}

type Tag = {
  html: string,
  links: Links,
  title: string,
}

type SimilarTagsProps = {
  tags: Tag[],
}

export default function SimilarTags({ tags }: SimilarTagsProps) {
  if (!tags) { // TODO: really need?
    tags = []
  }

  return (
    <div
      className={styles.self}
    >
      <header className={styles.header}>Похожие тэги</header>
      <menu className={styles.tags}>
        {tags.map(({ title, links }) => (
          <li
            key={title}
            className={styles['tag-container']}
          >
            <Link
              className={styles.tag}
              href={links.html}
              target="_blank"
            >
              {title}
            </Link>
          </li>
        ))}
      </menu>
    </div>
  )
}
