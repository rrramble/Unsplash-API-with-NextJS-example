import Favorite from './Favorite/favorite'
import HeaderLogo from './header-logo'
import History from '@/components/History/history'
import Search from './Search/search'

import styles from './header.module.scss'

export default function Header({ topics, isRootPage }) {
  return (
    <nav>
      <ul
        className={styles.self}
        id='menu'
      >
        <li className={styles.logo}><HeaderLogo isRootPage={isRootPage} /></li>
        <li className={styles.search}><Search topics={topics} /></li>
        <li className={styles.favorite}><Favorite /></li>
        <li className={styles.history}><History /></li>
      </ul>
    </nav>
  )
}
