import Image from 'next/image'
import Link from 'next/link'

export type AuthorInfoStyles = {
  instagram: string,
  name: string,
  self: string,
  thumbnail: string,
}

type AuthorInfoProps = {
  imageUrl?: string,
  instagramUsername?: string,
  name: string,
  styles: AuthorInfoStyles,
}

export default function AuthorInfo(props: AuthorInfoProps) {
  const instagramLink = props.instagramUsername &&
    (props.instagramUsername.includes('https://') ?
      props.instagramUsername :
      'https://instagram.com/' + props.instagramUsername
    )

  return (
    <address
      className={props.styles.self}
    >
      { props.imageUrl &&
        <Image
          alt="Аватар автора"
          className={props.styles.thumbnail}
          priority
          height="70"
          src={props.imageUrl}
          width="70"
        />
      }

      <div>
        <p className={props.styles.name}>
          <span className={'visually-hidden'}>Автор: </span>
          {props.name}
        </p>

        {
          props.instagramUsername ?
            <Link
              className={props.styles.instagram}
              href={instagramLink ?? '#'}
              rel="author"
            >
              <span className="visually-hidden">Инстаграм:</span>
              @{props.instagramUsername}
            </Link> :
            null
        }
      </div>
    </address>
  )
}
