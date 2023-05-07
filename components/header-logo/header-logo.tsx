import Image from 'next/image'
import Link from 'next/link'
import styles from './header-logo.module.scss'
import { AppRoute } from 'consts/consts'

type HeaderLogoProps = {
  className: string,
  isRootPage: boolean,
}

export default function HeaderLogo({ className = '', isRootPage }: HeaderLogoProps): JSX.Element {
  const LinkWrapper = ({ children }) => isRootPage ?
    <div>{children}</div> :
    <Link className={styles.self} href={AppRoute.Root}>{children}</Link>

  return (
    <div
      className={className}
      data-test="menu-logo"
    >
      <LinkWrapper
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
      </LinkWrapper>
    </div>
  )
}
