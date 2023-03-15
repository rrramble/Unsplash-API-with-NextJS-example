import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { getSearchedTexts, saveSearchedTexts, subscribeOnChangeSearchedTexts } from '@/utils/local-storage'
import { headerReducer } from './header-reducer'

import Favorite from './favorite/favorite'
import HeaderLogo from '@/components/header-logo/header-logo'
import { default as HistoryIcon } from '@/components/history/icon'
import { default as SearchIcon } from './search/icon'
import MenuModal from '@/components/menu-modal/menu-modal'
import Search from '@/components/search/search'
import History from '@/components/history/history'


import styles from './header.module.scss'

export default function Header({ topics, isRootPage }) {
  const router = useRouter()
  const [ state, dispatch ] = useReducer(headerReducer, {})
  const [ likedPhotos, setLikedPhotos ] = useState([])

  const onKeyUpWindow = ({ key }) => key === 'Escape' && dispatch({ type: 'escape-pressed' })
  const onScrollWindow = () => dispatch({ type: 'window-scrolled' })

  useEffect(() => {
    setLikedPhotos(getSearchedTexts())
    subscribeOnChangeSearchedTexts(() => setLikedPhotos(getSearchedTexts()))

    window.addEventListener('scroll', onScrollWindow)
    window.addEventListener('keyup', onKeyUpWindow)

    return () => {
      window.removeEventListener('scroll', onScrollWindow)
      window.removeEventListener('keyup', onKeyUpWindow)
    }
  }, [])

  useEffect(() => {
    isRootPage ?
      dispatch({ type: 'init' }) :
      dispatch({ type: 'minimize-menu' })
  }, [isRootPage])

  return (
    <nav
      className={styles.self}
      id='menu'
    >
      <div
        className={styles['menu-bar']}
      >
        <HeaderLogo
          className={styles.logo}
          isRootPage={isRootPage}
        />

        <SearchIcon
          className={styles.icon}
          isHidden={state.isSearchIconHidden}
          onClick={evt => {
            evt.stopPropagation()
            dispatch({ type: 'search-icon-clicked' })
          }}
          state={state.searchIcon}
        />

        <Favorite
          className={styles.icon}
        />

        <HistoryIcon
          className={styles.icon}
          isHidden={state.isHistoryIconHidden}
          onClick={(evt) => {
            evt.stopPropagation()
            dispatch({ type: 'history-icon-clicked' })
          }}
        />
      </div>

      <MenuModal
        className={styles.submenu}
        isHidden={state.isSearchHidden && state.isHistoryHidden}
      >
        <Search
          isFirstFocused={true}
          isFull={state.isSearchFull}
          isHidden={state.isSearchHidden}
          items={topics}
          onBlur={() => dispatch({ type: 'modal-blurred' })}
          onSubmit={onSubmitSearch(router)}
        />
        <History
          isFirstFocused={true}
          isHidden={state.isHistoryHidden}
          items={likedPhotos}
          onBlur={() => dispatch({ type: 'modal-blurred' })}
        />
      </MenuModal>
    </nav>
  )
}

const onSubmitSearch = (router) => {
  return (evt, text) => {
    evt.preventDefault()
    saveSearchedTexts(text)
    router.push({
      pathname: '/search/[text]',
      query: { text },
    })
  }
}
