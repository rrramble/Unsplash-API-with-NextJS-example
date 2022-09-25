import Link from 'next/link'

import styles from './favorite.module.scss'

export default function HeaderFavorite({ style }) {
  return (
    <div className={style}>
      <Link
        href='/favorite'
      >
        <a
          className={styles.self}
        >
          <span
            className="visually-hidden"
          >
              Избранное
          </span>
        </a>
      </Link>
    </div>
  )
}
