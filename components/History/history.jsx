import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getSearchedTexts, subscribeOnChangeSearchedTexts } from '@/utils/local-storage'

import Icon from './icon'
import Tags from './tags'
import styles from './history.module.scss'

const ESCAPE_KEY_CODE = 27

// TODO: Separate component logic
export default function History({ style }) {
  const router = useRouter()
  const tagsContainerRef = useRef(null)
  
  const [ iconRef, setIconRef ] = useState(null)
  const [ likedPhotos, setLikedPhotos ] = useState([])
  const [ componentState, setComponentState ] = useState(null)
  const [ tagsContainerStyle, setTagsContainerStyle ] = useState(null)
  const [ clickedElement, setClickedElement ] = useState(null)

  const onClickWindow = ({ target, relatedTarget }) => {
    setClickedElement(target ?? relatedTarget)
  }
  
  const onBlurForm = ({ relatedTarget }) => {
    if (contains(tagsContainerRef.current, relatedTarget)) {
      return
    }
    setComponentState('only-icon')
  }

  const onKeyUpWindow = (e) => {
    if (e.keyCode !== ESCAPE_KEY_CODE && e.charCode !== ESCAPE_KEY_CODE) {
      return
    }
    setComponentState('only-icon')
  }

  const onKeyUpForm = (e) => {
    if (e.key === 'Escape') {
      setComponentState('only-icon')
    }
  }

  function onSubmitForm(e) {
    e.preventDefault()
  }

  // Component initialization
  useEffect(() => {
    setComponentState('only-icon')
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

    // Clicked inside of tags container
    if (contains(tagsContainerRef.current, clickedElement)) {
      return
    }

    // Clicked on icon
    if (iconRef && (iconRef.current === clickedElement)) {
      return setComponentState(
        componentState === 'only-icon' ? 'history-shown' : 'only-icon'
      )
    }
    
    // Clicked outside of list of tags and outside of icon
    setComponentState('only-icon')
  }, [clickedElement])

  // Action: changed site address
  useEffect(() => {
    setComponentState('only-icon')
  }, [router.asPath])

  useEffect(() => {
    switch (componentState) {
      case 'only-icon':
        setTagsContainerStyle(styles['tags-container'] + ' ' + styles['tags-container--hidden'])
        break
      case 'history-shown':
        setTagsContainerStyle(styles['tags-container'] + ' ' + styles['tags-container--shown'])
        break
      default:
        break
    }
  }, [componentState])

  return (
    <div className={style}>
      <div className={styles.self}>
        <Icon
          onClick={(childRef) => setIconRef(childRef)}
          style={styles.icon}
        />
        <div className={tagsContainerStyle ?? styles['tags-container']}>
          <form
            action="/"
            method="GET"
            onBlur={onBlurForm}
            onKeyUp={onKeyUpForm}
            onSubmit={onSubmitForm}
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
          </form>
        </div>
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
