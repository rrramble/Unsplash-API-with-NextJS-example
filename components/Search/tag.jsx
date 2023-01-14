import Link from 'next/link'

import styles from './tag.module.scss'

export default function Tag({ link, text, cb }) {
  return (
    <Link
      href={link}
      className={styles.self}
      onClick={cb}
    >
      {text}
    </Link>
  )
}
