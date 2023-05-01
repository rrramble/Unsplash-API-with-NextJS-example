import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { contains } from '@/utils/helper-common'
import Tags from './tags'
import styles from './history.module.scss'
import { HistoryEntry } from 'types/history'
import { PlainFunction } from 'types/types'

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
      <Tags
        items={props.items}
      />
    </div>
  )
}
