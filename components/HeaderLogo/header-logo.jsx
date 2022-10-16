import Image from 'next/image'
import Link from 'next/link'

import styles from './header-logo.module.scss'

export default function HeaderLogo() {
  return (
    <Link href="/">
      <a className={styles.self}>
        <figure
          className={styles.container}
        >
          <Image
            src="/logo-white-on-black.svg"
            alt="Логотип"
            height="29px" width="29px"
          />

          <figcaption
            className={styles.header}
          >
            ImageStock
          </figcaption>
        </figure>
      </a>
    </Link>
  )
}
