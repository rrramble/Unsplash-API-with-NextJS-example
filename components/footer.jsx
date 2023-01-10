import Link from 'next/link'

import styles from './footer.module.scss'


export default function Footer() {
  return (
    <Link legacyBehavior
      href='#menu-margin-filler'
    >
      <a className={styles['go-up-button']}>
        <span className='visually-hidden'>
            В начало страницы
        </span>
      </a>
    </Link>
  )
}
