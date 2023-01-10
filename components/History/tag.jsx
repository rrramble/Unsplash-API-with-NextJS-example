import { useEffect, useRef } from 'react'
import Link from 'next/link'

import styles from './tag.module.scss'

export default function Tag({ isFocused, item }) {
  const { slug, title } = item
  const ref = useRef(null)
  const href = slug ?
    `/topic/${encodeURI(slug)}` :
    `/search/${encodeURI(title)}`

  useEffect(() => {
    isFocused && ref?.current?.focus()
  })

  return (
    <li
      className={styles.self}
    >
      <Link legacyBehavior
        href={href}
      >
        <a
          ref={ref}
        >
          {title}
        </a>
      </Link>
    </li>
  )
}
