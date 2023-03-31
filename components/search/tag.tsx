import Link from 'next/link'
import styles from './tag.module.scss'
import { PlainFunction } from 'types/types'

type TagProps = {
  cb: PlainFunction,
  link: string,
  text: string,
}

export default function Tag(props: TagProps): JSX.Element {
  return (
    <Link
      href={props.link}
      className={styles.self}
      onClick={props.cb}
    >
      {props.text}
    </Link>
  )
}
