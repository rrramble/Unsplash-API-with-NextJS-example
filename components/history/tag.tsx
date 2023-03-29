import { useRef } from 'react'
import Link from 'next/link'

import styles from './tag.module.scss'
import { HistoryEntry } from 'types/history'

type TagProps = {
  item: HistoryEntry,
}

export default function Tag({ item }: TagProps): JSX.Element {
  const { slug, title } = item
  const ref = useRef<HTMLAnchorElement | null>(null)
  const href = slug ?
    `/topic/${encodeURI(slug)}` :
    `/search/${encodeURI(title)}`

  return (
    <li
      className={styles.self}
    >
      <Link
        href={href}
        ref={ref}
      >
        {title}
      </Link>
    </li>
  )
}
