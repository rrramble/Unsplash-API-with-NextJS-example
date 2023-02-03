import Image from 'next/image'
import Link from 'next/link'
import styles from './author.module.scss'

export default function Author({ name, instagramUsername, imageUrl }) {
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

      { imageUrl &&
        <div
          className={styles.thumbnail}
        >
          <Image
            alt="Аватар автора"
            fill
            priority
            sizes="70px"
            src={imageUrl}
          />
        </div>
      }

      <div>
        <span className={styles.name}>{name}</span>
        { instagramUsername && (
          <>
            <span className="visually-hidden">Инстаграм:</span>
            <Link
              className={styles.instagram}
              href={instagramLink}
            >
              @{instagramUsername}
            </Link>
          </>
        )}
      </div>

    </address>
  )
}
