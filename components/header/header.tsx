import { useRouter, NextRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { FormEvent, Reducer, useEffect, useReducer, useState } from 'react'
import { getSearchedTexts, saveSearchedTexts, subscribeOnChangeSearchedTexts } from '@/utils/local-storage'
import Favorite from '@/components/favorite/favorite'
import HeaderLogo from '@/components/header-logo/header-logo'
import NavButton from '@/components/nav-button/nav-button'
import MenuModal from '@/components/menu-modal/menu-modal'
import Search from '@/components/search/search'
import History from '@/components/history/history'
import { headerReducer, INITIAL_STATE } from './header-reducer'
import styles from './header.module.scss'
import { findTopicByText } from '@/utils/topics'
import { AppRoute } from 'consts/consts'
import { SearchTopics } from 'types/search-tags'
import { MenuState } from 'types/menu-state'

type HeaderProps = {
  topics: SearchTopics,
}

export default function Header({ topics }: HeaderProps) {
  const router = useRouter()
  const isRootPage = usePathname() === AppRoute.Root
  const [ state, dispatch ] = useReducer<Reducer<MenuState, any>>(headerReducer, INITIAL_STATE)
  const [ searchedPhotos, setSearchedPhotos ] = useState<SearchTopics>([])

  const onKeyUpWindow = ({ key }: KeyboardEvent) => key === 'Escape' && dispatch({ type: 'escape-pressed' })
  const onScrollWindow = () => dispatch({ type: 'window-scrolled' })

  useEffect(() => {
    setSearchedPhotos(getSearchedTexts())
    subscribeOnChangeSearchedTexts(() => setSearchedPhotos(getSearchedTexts()))

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

        <NavButton
          className={styles['icon--search']}
          isHidden={state.isSearchIconHidden}
          onClick={(evt) => {
            evt.stopPropagation() // TODO remove?
            dispatch({ type: 'search-icon-clicked' })
          }}
          title="Поиск"
          wrapperClassName={styles.icon}
        />

        <Favorite
          className={styles.icon}
        />

        <NavButton
          className={styles['icon--history']}
          isHidden={state.isHistoryIconHidden}
          onClick={(evt) => {
            evt.stopPropagation()
            dispatch({ type: 'history-icon-clicked' })
          }}
          title="История поиска"
          wrapperClassName={styles.icon}
        />
      </div>

      <MenuModal
        className={styles.submenu}
        isHidden={state.isSearchHidden && state.isHistoryHidden}
        isFullHeight={state.isSearchFull}
      >
        <Search
          isFull={state.isSearchFull}
          isHidden={state.isSearchHidden}
          items={topics}
          onBlur={() => dispatch({ type: 'modal-blurred' })}
          onSubmit={onSubmitSearch(router, topics)}
        />
        <History
          isHidden={state.isHistoryHidden}
          items={searchedPhotos}
          onBlur={() => dispatch({ type: 'modal-blurred' })}
        />
      </MenuModal>
    </nav>
  )
}

const onSubmitSearch = (router: NextRouter, topics: SearchTopics) => {
  return function headerSubmitHandler(evt: FormEvent<HTMLFormElement>, text: string) {
    evt.preventDefault()
    const topic = findTopicByText(topics, text)
    saveSearchedTexts(topic || text)
    const { slug } = topic || {}

    router.push({
      pathname: slug === undefined ? `${AppRoute.Search}/[text]` : `${AppRoute.Topics}${slug}`,
      query: slug === undefined ? ({ text }) : undefined,
    })
  }
}
