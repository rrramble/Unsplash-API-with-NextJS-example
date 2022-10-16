import Image from 'next/image'
import Link from 'next/link'

import styles from './header-logo.module.scss'

export default function HeaderLogo() {
  return (
    <Link href="/">
      <a className={styles.self}>
        <figure>
          <Image
            src="/logo-white-on-black.svg"
            alt="Логотип" width="32" height="32"
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
