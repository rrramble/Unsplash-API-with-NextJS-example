
import { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from './tag.module.scss'

export default function Tag({ item }) {
  const { slug, title } = item
  const href = slug ?
    `/topic/${encodeURI(slug)}` :
    `/search/${encodeURI(title)}`

  return (
    <li
      className={styles.self}
    >
      <Link
        href={href}
      >
        <a>{title}</a>
      </Link>
    </li>
  )
}
