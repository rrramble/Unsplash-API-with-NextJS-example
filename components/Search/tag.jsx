import Link from 'next/link'

import styles from './tag.module.scss'

export default function Tag({ link, text, cb }) {
  return (
    <Link legacyBehavior
      href={link}
    >
      <a
        className={styles.self}
        onClick={cb}
      >
        {text}
      </a>
    </Link>
  )
}
