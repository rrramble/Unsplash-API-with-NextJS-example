import Image from 'next/image'
import Link from 'next/link'
import styles from './image-card-author.module.scss'

export default function ImageCardAuthor({ name, instagramUsername, imageUrl }) {
  const instagramLink = instagramUsername &&
    (instagramUsername.includes('https://') ?
      instagramUsername :
      'https://instagram.com/' + instagramUsername
    )

  return (
    <address
      className={styles.main}
      rel="author"
    >
      { imageUrl &&
        <Image
          className={styles.thumbnail}
          src={imageUrl}
          alt="Аватар автора"
          width="70px"
          height="70px"
        />
      }

    <span className={styles.name}>{name}</span>
    <span className="visually-hidden">Инстаграм:</span>
    { instagramUsername &&
      <Link
        href={instagramLink}
      >
        <a className={styles['instagram-account']}>@{instagramUsername}</a>
      </Link>
    }
    </address>
  )
}
