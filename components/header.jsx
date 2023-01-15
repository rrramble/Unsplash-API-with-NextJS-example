import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { getSearchedTexts, saveSearchedTexts, subscribeOnChangeSearchedTexts } from '@/utils/local-storage'

import Favorite from './Favorite/favorite'
import HeaderLogo from '@/components/HeaderLogo/header-logo'
import { default as HistoryIcon } from '@/components/History/icon'
import { default as SearchIcon } from './Search/icon'
import MenuModal from '@/components/MenuModal/menu-modal'
import Search from '@/components/Search/search'
import History from '@/components/History/history'


import styles from './header.module.scss'

export default function Header({ topics, isRootPage }) {
  const router = useRouter()
  const [ state, dispatch ] = useReducer(reducer, {})
  const [ likedPhotos, setLikedPhotos ] = useState([])

  const onKeyUpWindow = ({ key }) => key === 'Escape' && dispatch({ type: 'escape-pressed' })
  const onScrollWindow = () => dispatch({ type: 'window-scrolled' })

  useEffect(() => {
    dispatch({ type: 'init' })
    setLikedPhotos(getSearchedTexts())
    subscribeOnChangeSearchedTexts(() => setLikedPhotos(getSearchedTexts()))

    window.addEventListener('scroll', onScrollWindow)
    window.addEventListener('keyup', onKeyUpWindow)

    return () => {
      window.removeEventListener('scroll', onScrollWindow)
      window.removeEventListener('keyup', onKeyUpWindow)
    }
  }, [])

  // Action: changed site address
  useEffect(() => {
    dispatch({ type: 'init' })
  }, [router.asPath])

  return (
    <>
      <nav
        className={styles.self}
        id='menu'
      >
        <HeaderLogo
          className={styles.logo}
          isRootPage={isRootPage}
        />

        <SearchIcon
          className={styles.item}
          isHidden={state.isSearchIconHidden}
          onClick={(e) => e.stopPropagation() || dispatch({ type: 'search-icon-clicked' })}
          state={state.searchIcon}
          topics={topics}
        />

        <Favorite
          className={styles.item}
        />

        <HistoryIcon
          className={styles.item}
          isHidden={state.isHistoryIconHidden}
          onClick={(e) => e.stopPropagation() || dispatch({ type: 'history-icon-clicked' })}
        />

        <MenuModal
          className={styles.submenu}
        >
          <Search
            isFirstFocused={true}
            onBlur={() => dispatch({ type: 'modal-blurred' })}
            onSubmit={onSubmitSearch(router)}
            isFull={state.isSearchFull}
            isHidden={state.isSearchHidden}
            items={topics}
          />
          <History
            isFirstFocused={true}
            isHidden={state.isHistoryHidden}
            onBlur={() => dispatch({ type: 'modal-blurred' })}
            items={likedPhotos}
          />
        </MenuModal>
      </nav>
    </>
  )
}

const onSubmitSearch = (router) => {
  return (e, text) => {
    e.preventDefault()
    saveSearchedTexts(text)
    router.push({
      pathname: '/search/[text]',
      query: { text },
    })
  }
}

function reducer (state, { type }) {
  switch (true) {
    case
      type === 'init':
      return {
        isSearchIconHidden: true,
        isSearchHidden: false,
        isSearchFull: false,
        isHistoryIconHidden: false,
        isHistoryHidden: true,
      }

    case
      (type === 'search-icon-clicked' && !state.isSearchFull):
      return {
        // Open Search modal
        isSearchIconHidden: true,
        isSearchHidden: false,
        isSearchFull: true,
        isHistoryIconHidden: false,
        isHistoryHidden: true,
      }

    case
      (type === 'history-icon-clicked' && state.isHistoryHidden):
      return {
        // Open History modal
        isSearchIconHidden: false,
        isSearchHidden: true,
        isSearchFull: false,
        isHistoryIconHidden: true,
        isHistoryHidden: false,
    }

    case
      (type === 'escape-pressed' && (state.isSearchFull || !state.isHistoryHidden))||
      type === 'window-scrolled' ||
      (type === 'search-icon-clicked' && state.isSearchFull) ||
      (type === 'history-icon-clicked' && !state.isHistoryHidden) ||
      (type === 'modal-blurred' && (state.isSearchFull || !state.isHistoryHidden)):
      return {
        // Close modals
        isSearchIconHidden: false,
        isSearchHidden: true,
        isSearchFull: false,
        isHistoryIconHidden: false,
        isHistoryHidden: true,
      }
  }
  return state
}
