import Favorite from './Favorite/favorite'
import HeaderLogo from '@/components/HeaderLogo/header-logo'
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
        <li
          className={styles.logo}
          data-test="menu-logo"
        >
          <HeaderLogo isRootPage={isRootPage} />
        </li>

        <li
          className={styles.search}
          data-test="menu-search"
        >
          <Search topics={topics} />
        </li>

        <li
          className={styles.favorite}
          data-test="menu-favorite"
        >
          <Favorite />
        </li>

        <li
          className={styles.history}
          data-test="menu-history"
        >
          <History />
        </li>
      </ul>
    </nav>
  )
}
