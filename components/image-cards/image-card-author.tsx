import Image from 'next/image'
import Link from 'next/link'
import styles from './image-card-author.module.scss'

type ImageCardAuthorProps = {
  instagramUsername: string,
  imageUrl: string,
  name: string,
}

export default function ImageCardAuthor(props: ImageCardAuthorProps) {
  const instagramLink = props.instagramUsername &&
    (props.instagramUsername.includes('https://') ?
      props.instagramUsername :
      'https://instagram.com/' + props.instagramUsername
    )

  return (
    <address
      className={styles.self}
    >
      { props.imageUrl ?
        <Image
          className={styles.thumbnail}
          src={props.imageUrl}
          alt="Аватар автора"
          width="70"
          height="70"
        />
        : null
      }

      <div>
        <p className={styles.name}>
          <span className={'visually-hidden'}>Автор: </span>
          {props.name}
        </p>

        { props.instagramUsername ?
          <Link
            className={styles['instagram-account']}
            href={instagramLink}
            rel="author"
          >
            <span className="visually-hidden">Инстаграм:</span>
            @{props.instagramUsername}
          </Link>
          : null
        }
      </div>
    </address>
  )
}
