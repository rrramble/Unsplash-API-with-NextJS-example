import { useEffect, useRef, useState } from 'react'
import { saveSearchedTexts } from '../../utils/local-storage'
import { contains } from '@/utils/helper-browser'

import SearchInput from './search-input'
import Tags from './tags'

import styles from './search.module.scss'
// TODO: tags must not expand to the whole window on wide screen
export default function Search({
    onBlur,
    onKeyUp,
    onSubmit,
    passRef,
    items,
    isFull,
    isHidden,
}) {

  const ref = useRef()
  const [ inputRef, setInputRef] = useState()

  let additionalClassName
  if (isHidden) {
    additionalClassName = styles['self--hidden']
  } else if (isFull) {
    additionalClassName = styles['self--full']
  }

  useEffect(() => {
    passRef && passRef(ref)
  }, [passRef, ref])

  useEffect(() => {
    isFull && inputRef?.current?.focus()
  }, [inputRef, isFull])

  return (
    <form
      action="/search"
      className={styles.self + ' ' + additionalClassName}
      data-test="menu-search__modal"
      method="GET"
      onBlur={isRelatedTargetInsideComponent(onBlur)}
      onKeyUp={onKeyUp}
      onSubmit={(e) => onSubmit(e, inputRef?.current?.value)}
      ref={ref}
    >
      <SearchInput
        passRef={(childRef) => setInputRef(childRef)}
      />
      <Tags
        isFull={isFull}
        onClick={(item) => saveSearchedTexts(item)}
        items={items}
      />
    </form>
  )
}

function isRelatedTargetInsideComponent(callback) {
  return e => {
    !contains(e.currentTarget, e.relatedTarget) && callback(e)
  }
}
