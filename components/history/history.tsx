import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import HistoryList from '@/components/history-list/history-list'
import { contains } from '@/utils/helper-common'
import { HistoryEntry } from 'types/history'
import { PlainFunction } from 'types/types'
import styles from './history.module.scss'

type HistoryProps = {
  isHidden: boolean,
  items: HistoryEntry[],
  onBlur: PlainFunction,
}

export default function History(props: HistoryProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleWindowClick = (evt: MouseEvent) => {
    const { target } = evt
    if (!target || !(target instanceof Node)) {
      return
    }

    if (!contains(ref.current, target) && !props.isHidden) {
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
    <div
      className={classNames(styles.self, {
        [ styles['self--hidden'] ]: props.isHidden,
        [ styles['self--shown'] ]: !props.isHidden,
      })}

      data-test="menu-history__modal"
      ref={ref}
    >
      <header
        className={styles.header}
      >
        Ваши запросы
      </header>
      <HistoryList
        items={props.items}
      />
    </div>
  )
}
