import Image from 'next/image'
import Link from 'next/link'

import styles from './header-logo.module.scss'

type ThisProps = {
  className: string;
};

export default function HeaderLogo({ className = '' }: ThisProps) {
  return (
    <div
      className={className}
      data-test="menu-logo"
    >
      <Link
        className={styles.self}
        href="/"
      >
        <figure
          className={styles.container}
        >
          <Image
            src="/logo-white-on-black.svg"
            alt="Логотип"
            height="29" width="29"
          />

          <figcaption
            className={styles.header}
          >
            ImageStock
          </figcaption>
        </figure>
      </Link>
    </div>
  )
}
