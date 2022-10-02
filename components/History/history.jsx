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

  const [ likedPhotos, setLikedPhotos ] = useState([])
  const [ componentState, setComponentState ] = useState(null)
  const [ tagsContainerStyle, setTagsContainerStyle ] = useState(null)

  const onClickIcon = () => {
    const state = componentState === 'only-icon'?
      'history-shown' :
      'only-icon'
    setComponentState(state)
  }

  const onBlurForm = (e) => {
    if (contains(tagsContainerRef.current, e.relatedTarget)) {
      return
    }
    setComponentState('only-icon')
  }

  const onKeyUp = (e) => {
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

  // Component initialisation
  useEffect(() => {
    setComponentState('only-icon')
    window.addEventListener('keyup', onKeyUp)
    setLikedPhotos(getSearchedTexts())
    subscribeOnChangeSearchedTexts(() => setLikedPhotos(getSearchedTexts()))
  }, [])

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
          onClick={onClickIcon}
          style={styles.icon}
        />
        <form
          className={tagsContainerStyle ?? styles['tags-container']}
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
