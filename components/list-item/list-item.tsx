import Link from 'next/link'
import { PlainFunction } from 'types/types'

type ListItemProps = {
  className?: string,
  link: string,
  onClick?: PlainFunction,
  text: string,
}

export default function ListItem(props: ListItemProps): JSX.Element {
  return (
    <Link
      className={props.className}
      href={props.link}
      onClick={props.onClick}
    >
      {props.text}
    </Link>
  )
}
