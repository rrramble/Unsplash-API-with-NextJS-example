import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { saveSearchedTexts } from '@/utils/local-storage'
import { getSearchedTexts, subscribeOnChangeSearchedTexts } from '@/utils/local-storage'

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
  const [ searchContainerRef, setSearchContainerRef ] = useState(null)
  const [ historyContainerRef, setHistoryContainerRef ] = useState(null)
  const [ likedPhotos, setLikedPhotos ] = useState([])

  const onKeyUpWindow = ({ key }) => key === 'Escape' && dispatch({ type: 'escape-pressed' })
  const onScrollWindow = () => dispatch({ type: 'window-scrolled' })

  useEffect(() => {
    dispatch({ type: 'init' })
    const likedPhotos = getSearchedTexts()
    setLikedPhotos(likedPhotos)
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
          dataTest="menu-logo"
          isRootPage={isRootPage}
        />

        <SearchIcon
          className={styles.item}
          dataTest="menu-search"
          id="search"
          isHidden={state.isSearchIconHidden}
          onClick={() => dispatch({ type: 'search-icon-clicked' })}
          state={state.searchIcon}
          topics={topics}
        />

        <Favorite
          className={styles.item}
          dataTest="menu-favorite"
        />

        <HistoryIcon
          className={styles.item}
          dataTest="menu-history"
          isHidden={state.isHistoryIconHidden}
          onClick={() => dispatch({ type: 'history-icon-clicked' })}
        />
      </nav>

      <MenuModal
        className={styles.submenu}
      >
        <Search
          onBlur={onBlurModal(dispatch, searchContainerRef).bind(this)}
          onSubmit={onSubmitSearch(router)}
          passRef={(childRef) => setSearchContainerRef(childRef)}
          isFull={state.isSearchFull}
          isHidden={state.isSearchHidden}
          items={topics}
        />
        <History
          isHidden={state.isHistoryHidden}
          onBlur={onBlurModal(dispatch, historyContainerRef).bind(this)}
          passRef={(childRef) => {setHistoryContainerRef(childRef)}}
          items={likedPhotos}
        />
      </MenuModal>
    </>
  )
}

const onBlurModal = (dispatch, modalRef) => ({ relatedTarget }) => {
  if (!relatedTarget) {
    return dispatch({ type: 'modal-blurred' })
  }

  if (!contains(modalRef?.current, relatedTarget)) {
    return dispatch({ type: 'modal-blurred' })
  }
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
      type === 'escape-pressed' ||
      type === 'window-scrolled' ||
      (type === 'search-icon-clicked' && state.isSearchFull) ||
      (type === 'history-icon-clicked' && !state.isHistoryHidden) ||
      type === 'modal-blurred':
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

// TODO: move to its own library
function contains (parent, item) {
  if (parent === undefined || item === undefined || item === null) {
    return false
  }

  if (parent === item) {
    return true
  }

  const { parentNode: itemParentNode } = item
  if (itemParentNode === undefined) {
    return false
  }

  return contains(parent, itemParentNode)
}
