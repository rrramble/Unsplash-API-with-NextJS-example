import Image from 'next/image'
import Link from 'next/link'

export default function HeaderLogo({ style }) {
  return (
    <Link href="/">
      <a className={style}>
        <Image
          src="/logo-white-on-black.svg"
          alt="Логотип" width="32" height="32"
        />
      </a>
    </Link>
  )
}
