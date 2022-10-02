import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Icon from './icon'
import SearchInput from './search-input'
import Tags from './tags'

import styles from './search.module.scss'
import { saveSearchedTexts } from '@/utils/local-storage'

// TODO: Separate state logic from the component itself
export default function Search({ style, topics }) {
  const searchFormRef = useRef(null)
  const inputRef = useRef(null)
  const router = useRouter()

  const [ isScrolled, setScrolled ] = useState(false)
  const [ isIconClicked, setIconClicked ] = useState(false)
  const [ isTagsBlurred, setTagsBlurred ] = useState(false)
  const [ isInputFocused, setInputFocused ] = useState(false)
  const [ componentState, setComponentState ] = useState(null)

  const [ iconStyle, setIconStyle ] = useState(null)
  const [ searchContainerStyle, setSearchContainerStyle ] = useState(null)
  const [ isTagsFull, setIsTagsFull ] = useState(null)

  const onScrollSetScrolled = () => setScrolled(true);

  const onBlurForm = (e) => {
    const { relatedTarget } = e
    if (contains(searchFormRef.current, relatedTarget)) {
      return
    }
    setTagsBlurred(true)
  }

  const onKeyUpForm = (e) => {
    const { key } = e
    if (componentState !== 'tags-in-full') {
      return
    }
    if (key === 'Escape') {
      setComponentState('only-icon')
    }
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    const { value: searchedText } = inputRef.current
    saveSearchedTexts(searchedText)
  }

  // Component initialisation
  useEffect(() => {
    window.addEventListener('scroll', onScrollSetScrolled)
    setComponentState('search-minimal-shown')
  }, [])

  // Action: Window first scroll
  useEffect(() => {
    if (!isScrolled) {
      return
    }
    window.removeEventListener('scroll', onScrollSetScrolled)
    setComponentState('only-icon')
  }, [isScrolled])

  // Action: Search icon is clicked
  useEffect(() => {
    if (!isIconClicked) {
      return
    }
    setIconClicked(false)
    setComponentState('tags-in-full')
  }, [isIconClicked])

  // Action: search field or tags are escaped
  useEffect(() => {
    if (!isTagsBlurred) {
      return
    }
    setTagsBlurred(false)
    if (componentState === 'search-minimal-shown') {
      return
    }
    setComponentState('only-icon')
  }, [isTagsBlurred])

  // Action: input field is focused
  useEffect(() => {
    if (!isInputFocused) {
      return
    }
    setInputFocused(false)
    setComponentState('tags-in-full')
  }, [isInputFocused])

  // Action: changed site address
  useEffect(() => {
    if (componentState === 'tags-in-full') {
      setComponentState('only-icon')
    }
  }, [router.asPath])

  useEffect(() => {
    switch (componentState) {
      case 'search-minimal-shown':
        setIconStyle(styles['icon--hidden'])
        setSearchContainerStyle(styles['search-container'])
        setIsTagsFull(false)
        break
      case 'only-icon':
        setIconStyle(styles.icon)
        setSearchContainerStyle(styles['search-container'] + ' ' + styles['search-container--hidden'])
        setIsTagsFull(false)
        break
      case 'tags-in-full':
        setIconStyle(styles['icon--hidden'])
        setSearchContainerStyle(styles['search-container'] + ' ' + styles['search-container--full'])
        setIsTagsFull(true)
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0)
        break
    }
  }, [componentState])


  return (
    <div className={style}>
      <div
        className={styles.self}
        id="search"
      >
        <Icon
          style={iconStyle}
          onClick={() => setIconClicked(true)}
        />
        <form
          className={searchContainerStyle}
          onBlur={onBlurForm}
          onKeyUp={onKeyUpForm}
          onSubmit={onSubmitForm}
          ref={searchFormRef}
          action="/search/"
          method="GET"
        >
          <SearchInput
            inputRef={inputRef}
          />
          <Tags
              isFull={isTagsFull}
              topics={topics}
          />
        </form>
      </div>
    </div>
  )
}

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
