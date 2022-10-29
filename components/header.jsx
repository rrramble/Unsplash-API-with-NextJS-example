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
          onClick={() => dispatch({ type: 'history-icon-clicked' })}
        />
      </nav>

      <MenuModal
        className={styles.submenu}
      >
        <Search
          onBlur={onBlurSearch(dispatch, searchContainerRef).bind(this)}
          onSubmit={onSubmitSearch(router)}
          passRef={(childRef) => setSearchContainerRef(childRef)}
          isOpen={state.isSearchContainerOpen}
          isFull={state.isSearchContainerFull}
          items={topics}
        />
        <History
          isShown={state.isHistoryShown}
          onBlur={onBlurHistory(dispatch, historyContainerRef).bind(this)}
          passRef={(childRef) => {setHistoryContainerRef(childRef)}}
          items={likedPhotos}
        />
      </MenuModal>
    </>
  )
}

const onBlurHistory = (dispatch, historyContainerRef) => {
  return ({ relatedTarget }) => {
    if (!relatedTarget) {
      return dispatch({ type: 'history-tags-blurred' })
    }
    if (!contains(historyContainerRef?.current, relatedTarget)) {
      return dispatch({ type: 'history-tags-blurred' })
    }
  }
}

const onBlurSearch = (dispatch, searchFormRef) => {
  return ({ relatedTarget }) => {
    if (!relatedTarget) {
      return dispatch({ type: 'search-tags-blurred' })
    }
    if (!contains(searchFormRef?.current, relatedTarget)) {
      return dispatch({ type: 'search-tags-blurred' })
    }
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
        isHistoryShown: false,
        isSearchIconHidden: false,
        isSearchContainerOpen: true,
        isSearchContainerFull: false,
      }

    case
      (type === 'search-icon-clicked' && !state.isSearchContainerFull):
      return {
        isHistoryShown: false,
        isSearchIconHidden: false,
        isSearchContainerOpen: true,
        isSearchContainerFull: true,
      }

    case
      type === 'escape-pressed' ||
      type === 'window-scrolled' ||
      (type === 'search-icon-clicked' && state.isSearchContainerFull) ||
      (type === 'history-icon-clicked' && state.isHistoryShown) ||
      (type === 'search-tags-blurred' && state.isSearchContainerFull):
      return {
        isHistoryShown: false,
        isSearchIconHidden: false,
        isSearchContainerOpen: false,
        isSearchContainerFull: false,
      }

    case
      (type === 'history-icon-clicked' && !state.isHistoryShown):
      return {
        isHistoryShown: true,
        isSearchIconHidden: false,
        isSearchContainerOpen: false,
        isSearchContainerFull: false,
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
