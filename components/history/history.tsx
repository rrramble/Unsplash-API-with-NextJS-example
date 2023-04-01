import { useEffect, useRef } from 'react'
import { HistoryEntry } from 'types/history'
import { contains } from '@/utils/helper-common'
import Tags from './tags'
import styles from './history.module.scss'
import { PlainFunction } from 'types/types'

type HistoryProps = {
  isHidden: boolean,
  items: HistoryEntry[],
  onBlur: PlainFunction,
}

export default function History(props: HistoryProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)
  const windowClickHandler = (evt: MouseEvent) => {
    const { target } = evt
    if (!contains(ref.current, target) && !props.isHidden) {
      props.onBlur()
    }
  }

  useEffect(() => {
    window.addEventListener('click', windowClickHandler)
    return () => {
      window.removeEventListener('click', windowClickHandler)
    }
  })

  const additionalClassName = props.isHidden ?
    styles['self--hidden'] :
    styles['self--shown']

  return (
    <div
      className={`${styles.self} ${additionalClassName}`}
      data-test="menu-history__modal"
      ref={ref}
    >
      <header
        className={styles.header}
      >
        Ваши запросы
      </header>
      <Tags
        items={props.items}
      />
    </div>
  )
}
