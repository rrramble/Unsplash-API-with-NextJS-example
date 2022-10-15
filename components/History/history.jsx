import { useEffect, useReducer, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getSearchedTexts, subscribeOnChangeSearchedTexts } from '@/utils/local-storage'

import Icon from './icon'
import Tags from './tags'
import styles from './history.module.scss'

const ESCAPE_KEY_CODE = 27

// TODO: Separate component logic from component file
export default function History() {
  const router = useRouter()
  const [ state, dispatch ] = useReducer(reduce, { componentState: null, tagsContainerStyle: null })
  const [ iconRef, setIconRef ] = useState(useRef())
  const tagsContainerRef = useRef(null)

  const [ likedPhotos, setLikedPhotos ] = useState([])
  const [ clickedElement, setClickedElement ] = useState(null)

  // Global event listeners
  const onClickWindow = ({ target, relatedTarget }) => {
    setClickedElement(target ?? relatedTarget)
  }

  const onKeyUpWindow = (e) => {
    if (e.key === 'Escape' || e.code === 'Escape') {
      dispatch({ type: 'history-blurred' })
    }
  }

  // Component event listeners
  const onBlurForm = ({ relatedTarget }) => {
    !contains(tagsContainerRef.current, relatedTarget) &&
    dispatch({ type: 'history-blurred' })
  }

    // Component initialization
  useEffect(() => {
    dispatch({ type: 'init' })
    setLikedPhotos(getSearchedTexts())
    subscribeOnChangeSearchedTexts(() => setLikedPhotos(getSearchedTexts()))
    window.addEventListener('click', onClickWindow)
    window.addEventListener('keyup', onKeyUpWindow)

    return () => {
      window.removeEventListener('click', onClickWindow)
      window.removeEventListener('keyUp', onKeyUpWindow)
    }
  }, [])

  // Action: window is clicked
  useEffect(() => {
    if (!clickedElement) {
      return
    }
    setClickedElement(null)

    if (clickedElement === iconRef.current) {
      return dispatch({ type: 'icon-clicked'})
    }

    // Clicked inside of history container
    !contains(tagsContainerRef.current, clickedElement) &&
      dispatch({ type: 'history-blurred'})
  }, [clickedElement])

  // Action: changed site address
  useEffect(() => {
    dispatch({ type: 'init' })
  }, [router.asPath])

  return (
    <div className={styles.self}>
      <Icon
        passRef={(childRef) => setIconRef(childRef)}
        style={styles.icon}
      />
      <div
        className={state.tagsContainerStyle}
        onBlur={onBlurForm}
        ref={tagsContainerRef}
      >
        <header
          className={styles.header}
        >
          Ваши запросы
        </header>
        <Tags
          items={likedPhotos}
        />
      </div>
    </div>
  )
}

// TODO: Move to helper library
function contains(parent, item) {
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

function reduce (state, { type }) {
  switch (true) {
    case
      (type === 'init') ||
      (state.componentState === 'history-shown' && type === 'history-blurred') ||
      (state.componentState === 'history-shown' && type === 'icon-clicked'):
      return {
        ...state,
        componentState: 'only-icon',
        tagsContainerStyle: styles['tags-container'] + ' ' + styles['tags-container--hidden'],
      }

    case
      state.componentState === 'only-icon' && type === 'icon-clicked':
      return {
        ...state,
        componentState: 'history-shown',
        tagsContainerStyle: styles['tags-container'] + ' ' + styles['search-container--shown'],
      }
  }
  return state
}
