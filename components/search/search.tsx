import { FocusEvent, FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { saveSearchedTexts } from '../../utils/local-storage'
import { contains } from '@/utils/helper-browser'
import SearchInput from './search-input'
import Tags from './tags'
import { SearchTopics } from 'types/search-tags'
import { PlainFunction } from 'types/types'
import styles from './search.module.scss'

type OnBlur = () => void

type SearchProps = {
  isFull: boolean,
  items: SearchTopics,
  isHidden: boolean,
  onBlur: PlainFunction,
  onSubmit: (evt: FormEvent, text: string) => void,
}

export default function Search({
  onBlur,
  onSubmit,
  items,
  isFull,
  isHidden,
}: SearchProps) {

  const formRef = useRef()
  const [ inputRef, setInputRef ] = useState<MutableRefObject<HTMLInputElement> | null>(null)

  const windowClickHandler = (evt: KeyboardEvent) => {
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
      onBlur={getCallbackOnBlur(onBlur)}
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

function getCallbackOnBlur(callback: OnBlur) {
  return function callbackIfDescendant(evt: FocusEvent) {
    !contains(evt.currentTarget, evt.relatedTarget) && callback()
  }
}
