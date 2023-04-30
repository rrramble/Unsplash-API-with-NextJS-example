import { FocusEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { saveSearchedTexts } from '@/utils/local-storage'
import { contains } from '@/utils/helper-common'
import { SearchTopics } from 'types/search-tags'
import { PlainFunction } from 'types/types'
import SearchInput from './search-input'
import Tags from './tags'
import styles from './search.module.scss'
import classNames from 'classnames'

type SearchProps = {
  isFull: boolean,
  items: SearchTopics,
  isHidden: boolean,
  onBlur: PlainFunction,
  onSubmit: (evt: FormEvent<HTMLFormElement>, text: string) => void,
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

  useEffect(() => {
    window.addEventListener('click', windowClickHandler)

    return () => {
      window.removeEventListener('click', windowClickHandler)
    }
  })

  return (
    <form
      action="/search"
      className={classNames(styles.self, {
        [ styles['self--hidden'] ]: props.isHidden,
        [ styles['self--full'] ]: !props.isHidden && props.isFull,
      })}
      data-test="menu-search__modal"
      method="GET"
      onBlur={getCallbackOnBlur(props.onBlur)}
      onSubmit={(evt: FormEvent<HTMLFormElement>) => props.onSubmit(evt, searchedText)}
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
