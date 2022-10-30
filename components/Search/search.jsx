import { useEffect, useRef, useState } from 'react'

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
  })

  useEffect(() => {
    isFull && inputRef?.current?.focus()
  }, [inputRef, isFull])

  return (
    <form
      action="/search"
      className={styles.self + ' ' + additionalClassName}
      data-test="menu-search__modal"
      method="GET"
      onBlur={onBlur}
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
