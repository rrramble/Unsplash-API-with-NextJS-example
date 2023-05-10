import Image from 'next/image'
import Link from 'next/link'
import styles from './image-card-author.module.scss'

type ImageCardAuthorProps = {
  imageUrl: string,
  instagramUsername: string,
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
      { props.imageUrl &&
        <Image
          alt="Аватар автора"
          className={styles.thumbnail}

          height="70"
          src={props.imageUrl}
          width="70"
        />
      }

      <div>
        <p className={styles.name}>
          <span className={'visually-hidden'}>Автор: </span>
          {props.name}
        </p>

        {
          props.instagramUsername ?
            <Link
              className={styles.instagram}
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
