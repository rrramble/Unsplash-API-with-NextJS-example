import Link from 'next/link'

import styles from './favorite.module.scss'

export default function HeaderFavorite({ className, dataTest }) {
  return (
    <div
      className={className}
      data-test={dataTest}
    >
      <Link
        aria-label="Photos you liked"
        className={styles.self}
        href='/favorite'
      >
        <span
          className={styles.text}
          aria-label="List of liked photos"
        >
          Избранное
        </span>
      </Link>
    </div>
  )
}
