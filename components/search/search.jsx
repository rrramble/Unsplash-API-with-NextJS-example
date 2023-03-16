import { useEffect, useRef, useState } from 'react'
import { saveSearchedTexts } from '../../utils/local-storage'
import { contains } from '@/utils/helper-browser'

import SearchInput from './search-input'
import Tags from './tags'

import styles from './search.module.scss'
export default function Search({
  onBlur,
  onKeyUp,
  onSubmit,
  passRef,
  items,
  isFull,
  isHidden,
}) {

  const formRef = useRef()
  const [ inputRef, setInputRef ] = useState()

  const windowClickHandler = (evt) => {
    const { target } = evt
    if (!contains(formRef.current, target) && !isHidden) {
      onBlur()
    }
  }

  let additionalClassName = ''
  if (isHidden) {
    additionalClassName = styles['self--hidden']
  } else if (isFull) {
    additionalClassName = styles['self--full']
  }

  useEffect(() => {
    passRef && passRef(formRef)
  }, [passRef, formRef])

  useEffect(() => {
    window.addEventListener('click', windowClickHandler)

    return () => {
      window.removeEventListener('click', windowClickHandler)
    }
  })

  return (
    <form
      action="/search"
      className={styles.self + ' ' + additionalClassName}
      data-test="menu-search__modal"
      method="GET"
      onBlur={isRelatedTargetInsideComponent(onBlur)}
      onKeyUp={onKeyUp}
      onSubmit={(e) => onSubmit(e, inputRef?.current?.value)}
      ref={formRef}
    >
      <SearchInput
        passRef={(childRef) => setInputRef(childRef)}
      />
      <Tags
        isFull={isFull}
        items={items}
        onClick={(item) => saveSearchedTexts(item)}
      />
    </form>
  )
}

function isRelatedTargetInsideComponent(callback) {
  return e => {
    !contains(e.currentTarget, e.relatedTarget) && callback(e)
  }
}
