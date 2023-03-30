import Image from 'next/image'
import Link from 'next/link'
import styles from './author.module.scss'

type AuthorProps = {
  imageUrl: string,
  instagramUsername: string,
  name: string,
}

export default function Author(props: AuthorProps) {
  const instagramLink = props.instagramUsername &&
    (props.instagramUsername.includes('https://') ?
      props.instagramUsername :
      'https://instagram.com/' + props.instagramUsername
    )

  return (
    <address
      className={styles.self}
    >
      { props.imageUrl &&
        <div
          className={styles.thumbnail}
        >
          <Image
            alt="Аватар автора"
            fill
            priority
            sizes="70px"
            src={props.imageUrl}
          />
        </div>
      }

      <div>
        <p className={styles.name}>
          <span className={'visually-hidden'}>Автор: </span>
          {props.name}
        </p>
        { props.instagramUsername &&
          <Link
            className={styles.instagram}
            href={instagramLink}
            rel="author"
          >
            <span className="visually-hidden">Инстаграм:</span>
            {props.instagramUsername}
          </Link>
        }
      </div>

    </address>
  )
}
