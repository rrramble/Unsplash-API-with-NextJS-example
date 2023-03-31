import { FocusEvent, FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { saveSearchedTexts } from '@/utils/local-storage'
import { contains } from '@/utils/helper-browser'
import SearchInput from './search-input'
import Tags from './tags'
import { SearchTopics } from 'types/search-tags'
import { PlainFunction } from 'types/types'
import styles from './search.module.scss'

type SearchProps = {
  isFull: boolean,
  items: SearchTopics,
  isHidden: boolean,
  onBlur: PlainFunction,
  onSubmit: (evt: FormEvent, text: string) => void,
}

export default function Search(props: SearchProps) {
  const formRef = useRef()
  const [ searchedText, setSearchedText ] = useState<string>('')

  const windowClickHandler = (evt: KeyboardEvent) => {
    const { target } = evt
    if (!contains(formRef.current, target) && !props.isHidden) {
      props.onBlur()
    }
  }

  let additionalClassName = ''
  if (props.isHidden) {
    additionalClassName = styles['self--hidden']
  } else if (props.isFull) {
    additionalClassName = styles['self--full']
  }

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
      onBlur={getCallbackOnBlur(props.onBlur)}
      onSubmit={(e) => props.onSubmit(e, searchedText)}
      ref={formRef}
    >
      <SearchInput
        text={searchedText}
        onChange={(text) => setSearchedText(text)}
      />
      <Tags
        isFull={props.isFull}
        items={props.items}
        onClick={(item) => saveSearchedTexts(item)}
      />
    </form>
  )
}

function getCallbackOnBlur(callback: PlainFunction) {
  return function callbackIfDescendant(evt: FocusEvent) {
    !contains(evt.currentTarget, evt.relatedTarget) && callback()
  }
}
