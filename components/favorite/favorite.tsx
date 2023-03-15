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
