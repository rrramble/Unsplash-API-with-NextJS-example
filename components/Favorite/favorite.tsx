import Link from 'next/link'

import styles from './favorite.module.scss'

type ThisProps = {
  className: string;
};

export default function HeaderFavorite({ className }: ThisProps) {
  return (
    <div
      className={className}
      data-test="menu-favorite"
      >
      <Link
        aria-label="Photos you liked"
        className={styles.self}
        href='/favorite'
      >
        <span
          className={styles.title}
          aria-label="List of liked photos"
        >
          Избранное
        </span>
      </Link>
    </div>
  )
}
