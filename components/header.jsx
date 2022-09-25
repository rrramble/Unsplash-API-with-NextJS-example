import Favorite from './Favorite/favorite'
import HeaderLogo from './header-logo'
import History from '@/components/History/history'
import Search from './Search/search'

import styles from './header.module.scss'

export default function Header({ topics, isRootPage }) {
  return (
    <nav
      className={styles.self}
      id='menu'
    >
      <HeaderLogo style={styles.logo} isRootPage={isRootPage} />
      <Search topics={topics} style={styles.search} />
      <Favorite style={styles.favorite} />
      <History style={styles.history} />
    </nav>
  )
}
