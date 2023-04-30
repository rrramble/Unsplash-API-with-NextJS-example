import Link from 'next/link'
import styles from './favorite.module.scss'
import { AppRoute } from 'consts/consts'

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
        href={AppRoute.Favorites}
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
