import { useRef } from 'react'
import Link from 'next/link'
import styles from './tag.module.scss'
import { HistoryEntry } from 'types/history'
import { AppRoute } from 'consts/consts'

type TagProps = {
  item: HistoryEntry,
}

export default function Tag({ item }: TagProps): JSX.Element {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const { slug, title } = item
  const href = slug ?
    `${AppRoute.Topics}${encodeURI(slug)}` :
    `${AppRoute.Search}/${encodeURI(title)}`

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
