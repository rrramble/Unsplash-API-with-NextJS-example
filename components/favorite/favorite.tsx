import Link from 'next/link'
import styles from './favorite.module.scss'

type FavoriteProps = {
  className: string,
}

export default function Favorite({ className }: FavoriteProps): JSX.Element {
  return (
    <div
      className={className}
      data-test="menu-favorite"
    >
      <Link
        className={styles.self}
        href='/favorite'
      >
        <span
          className={styles.title}
        >
          Избранное
        </span>
      </Link>
    </div>
  )
}
