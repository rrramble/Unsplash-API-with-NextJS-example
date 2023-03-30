import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { saveSearchedTexts } from '../../utils/local-storage'
import { contains } from '@/utils/helper-browser'
import SearchInput from './search-input'
import Tags from './tags'
import { SearchTags } from 'types/search-tags'
import styles from './search.module.scss'

type OnBlur = () => void

type SearchProps = {
  onBlur: () => OnBlur,
  onKeyUp: () => void,
  onSubmit: (evt: FormEvent, text: string) => void,
  passRef: (ref: MutableRefObject<HTMLFormElement>) => void,
  items: SearchTags,
  isFull: boolean,
  isHidden: boolean,
}

export default function Search({
  onBlur,
  onKeyUp,
  onSubmit,
  passRef,
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
      onBlur={getCallbackOnBlur(onBlur)}
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

function getCallbackOnBlur(callback: OnBlur) {
  return function callbackIfDescendant(evt: FocusEvent) {
    !contains(evt.currentTarget, evt.relatedTarget) && callback()
  }
}
