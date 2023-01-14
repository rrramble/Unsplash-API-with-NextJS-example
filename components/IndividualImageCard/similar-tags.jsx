import Link from 'next/link'

import styles from './similar-tags.module.scss'

export default function SimilarTags({ tags = [] }) {
  return (
    <aside>
      <h2 className={styles.header}>Похожие тэги</h2>
      <menu className={styles.container}>
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
    </aside>
  )
}
