import Link from 'next/link'

import styles from './favorite.module.scss'

export default function HeaderFavorite({ style }) {
  return (
    <div className={style}>
      <Link
        href='/favorite'
      >
        <a
          aria-label="Photos you liked"
          className={styles.self}
        >
          <span
            className={styles.text}
          >
              Избранное
          </span>

        </a>
      </Link>
    </div>
  )
}
