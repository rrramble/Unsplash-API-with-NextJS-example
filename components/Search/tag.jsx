import Link from 'next/link'

import styles from './tag.module.scss'

export default function Tag({ link, text }) {
  return (
    <Link
      href={link}
    >
      <a
        className={styles.text}
      >
        {text}
      </a>
    </Link>
  )
}
