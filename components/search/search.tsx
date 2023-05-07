import { FocusEvent, FormEvent, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import SearchInput from '@/components/search-input/search-input'
import SearchList from '@/components/search-list/search-list'
import { saveSearchedTexts } from '@/utils/local-storage'
import { contains } from '@/utils/helper-common'
import { AppRoute } from 'consts/consts'
import { SearchTopics } from 'types/search-tags'
import { PlainFunction } from 'types/types'
import styles from './search.module.scss'

type SearchProps = {
  isFull: boolean,
  items: SearchTopics,
  isHidden: boolean,
  onBlur: PlainFunction,
  onSubmit: (_evt: FormEvent<HTMLFormElement>, _text: string) => void,
}

export default function Search(props: SearchProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [ searchedText, setSearchedText ] = useState<string>('')

  const handleWindowClick = (evt: MouseEvent) => {
    const { target } = evt
    if (!target || !(target instanceof Node)) {
      return
    }

    if (!contains(formRef.current, target) && !props.isHidden) {
      props.onBlur()
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)

    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  })

  return (
    <form
      action={AppRoute.Search}
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
      <SearchList
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
