import Image from 'next/image'
import Link from 'next/link'
import styles from './image-card-author.module.scss'

export default function ImageCardAuthor({
  instagramUsername,
  imageUrl,
  name,
}) {
  const instagramLink = instagramUsername &&
    (instagramUsername.includes('https://') ?
      instagramUsername :
      'https://instagram.com/' + instagramUsername
    )

  return (
    <address
      className={styles.self}
      rel="author"
    >
      { imageUrl ?
        <Image
          className={styles.thumbnail}
          src={imageUrl}
          alt="Аватар автора"
          width="70"
          height="70"
        />
        : null
      }

        <p className={styles.name}>
          <span className={'visually-hidden'}>Автор: </span>
          {name}
        </p>

        { instagramUsername ?
    </address>
  )
}
