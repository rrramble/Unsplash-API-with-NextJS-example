import Image from 'next/image'

import ImageCardAuthor from './image-card-author'
import ImageCardMenu from './image-card-menu'

import styles from './image-card.module.scss'

const RENDERED_WIDTH = 476

export default function ImageCard({ photo, isLiked, onClickLikeButton }) {
  const {
    user: author = [],
    urls: photoUrls = [],
    id: photoId,
    height,
    width,
  } = photo
  const photoAlt = photo.alt_description ?? `photo by ${author.name}`
  const { profile_image } = author
  const {
    regular: regularPhotoUrl,
    small: smallPhotoUrl,
    thumb: thumbnailPhotoUrl,
  } = photoUrls

  const renderedHeight = height / width * RENDERED_WIDTH
  const photoUrl = regularPhotoUrl || smallPhotoUrl || thumbnailPhotoUrl
  const photoProfileUrl = '/photo/' + (photoId ?? '')

  return (
    <figure className={styles.self} data-test="image-card">
      <figcaption className={styles['author-menu-container']}>
        <ImageCardAuthor
          name={author.name}
          instagramUsername={author.instagram_username}
          imageUrl={profile_image.medium}
        />
        <ImageCardMenu
          photoProfileUrl={photoProfileUrl}
          isLiked={isLiked}
          onClickLikeButton={onClickLikeButton}
        />
      </figcaption>

      <div className={styles['image-container']}>
        <div className={styles.image}>
          <Image
            alt={photoAlt}
            height={renderedHeight}
            src={photoUrl}
            style={{
              borderRadius: 'inherit',
            }}
            width={RENDERED_WIDTH}
          />
        </div>
      </div>
    </figure>
  )
}
