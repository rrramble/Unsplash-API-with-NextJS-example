import { useEffect, useReducer, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Icon from './icon'
import SearchInput from './search-input'
import Tags from './tags'

import styles from './search.module.scss'
import { saveSearchedTexts } from '@/utils/local-storage'

// TODO: Separate state logic from the component file
function Search({ topics }) {
  const [ state, dispatch ] = useReducer(reducer, { componentState: null, iconStyle: null, searchContainerStyle: null })
  const router = useRouter()
  const searchFormRef = useRef(null)
  const [ iconRef, setIconRef ] = useState()
  const [ inputRef, setInputRef ] = useState()
  const [ clickedElement, setClickedElement] = useState(null)

  const onScrollWindow = () => dispatch({ type: 'window-scrolled'});

  const onClickWindow = ({ target, relatedTarget }) => {
    setClickedElement(target ?? relatedTarget)
  }

   const onBlurForm = ({ relatedTarget }) => {
    relatedTarget &&
    !contains(searchFormRef.current, relatedTarget) &&
    dispatch({ type: 'tags-blurred'})
  }

  const onKeyUpForm = ({ key }) => {
    key === 'Escape' && dispatch('tags-blurred')
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    const { value: searchedText } = inputRef.current
    saveSearchedTexts(searchedText)
    router.push({
      pathname: '/search/[text]',
      query: { text: searchedText },
    })
  }

  // Component initialisation
  useEffect(() => {
    dispatch({ type: 'init' })
    window.addEventListener('scroll', onScrollWindow)
    window.addEventListener('click', onClickWindow)
    return () => {
      window.removeEventListener('scroll', onScrollWindow)
      window.removeEventListener('click', onClickWindow)
    }
  }, [])

  // Action: changed site address
  useEffect(() => {
    dispatch({ type: 'init' })
  }, [router.asPath])

  useEffect(() => {
    if (!clickedElement) {
      return
    }
    setClickedElement(null)

    if (contains(searchFormRef.current, clickedElement)) {
      return
    }
    if (clickedElement === iconRef.current) {
      dispatch({ type: 'icon-clicked' })
      return // TODO: can 'dispatch' be combined with 'return'?
    }
    onBlurForm({ relatedTarget: clickedElement })
  }, [clickedElement])

  return (
    <div
      className={styles.self}
      id="search"
    >
      <div
        className={styles.icon}
      >
        <Icon
          isHidden={state.isIconHidden}
          onClick={() => dispatch('icon-clicked')}
          passRef={(childRef) => setIconRef(childRef)}
        />
      </div>
      <form
        action="/search"
        className={state.searchContainerStyle}
        data-test="menu-search__modal"
        method="GET"
        onBlur={onBlurForm}
        onKeyUp={onKeyUpForm}
        onSubmit={onSubmitForm}
        ref={searchFormRef}
      >
        <SearchInput
          passRef={(childRef) => setInputRef(childRef)}
        />
        <Tags
            isFull={state.componentState === 'tags-in-full'}
            onClick={(item) => saveSearchedTexts(item)}
            topics={topics}
        />
      </form>
    </div>
  )
}
// TODO: move to its own library
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

function reducer (state, { type }) {
  switch (true) {
    case type === 'init':
      return {
        componentState: 'search-minimal-shown',
        isIconHidden: true,
        searchContainerStyle: styles['search-container'],
      }

    case
      (state.componentState === 'search-minimal-shown' && type === 'window-scrolled') ||
      (state.componentState === 'tags-in-full' && type === 'tags-blurred'):
      return {
        ...state,
        componentState: 'only-icon',
        isIconHidden: false,
        searchContainerStyle: styles['search-container'] + ' ' + styles['search-container--hidden'],
      }

    case
      (state.componentState === 'only-icon' && type === 'icon-clicked') ||
      (state.componentState === 'search-minimal-shown' && type === 'input-focused'):
      return {
        ...state,
        componentState: 'tags-in-full',
        isIconHidden: true,
        searchContainerStyle: styles['search-container'] + ' ' + styles['search-container--full'], // TODO: add useEffect for this property to focus search input field
      }
  }
  return state
}

export default Search
