import Link from 'next/link'

import styles from './similar-tags.module.scss'

export default function SimilarTags({ tags }) {
  if (!tags) {
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
