import Image from 'next/image'
import Link from 'next/link'

import styles from './header-logo.module.scss'

export default function HeaderLogo({ className = '', dataTest }) {
  return (
    <div
      className={className}
      data-test={dataTest}
    >
      <Link legacyBehavior href="/">
        <a className={styles.self}>
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
        </a>
      </Link>
    </div>
  )
}
