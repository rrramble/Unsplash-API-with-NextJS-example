import Link from 'next/link'

import styles from './favorite.module.scss'

export default function HeaderFavorite() {
  return (
    <Link
      href='/favorite'
    >
      <a
        aria-label="Photos you liked"
        className={styles.self}
      >
        <span
          className={styles.text}
          aria-label="List of liked photos"
        >
            Избранное
        </span>

      </a>
    </Link>
  )
}
