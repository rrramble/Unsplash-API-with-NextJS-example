import Image from 'next/image'

import ImageCardAuthor from './image-card-author'
import ImageCardMenu from './image-card-menu'

import styles from './image-card.module.scss'

const RENDERED_WIDTH = 476

export default function ImageCard(
  {
    isLiked,
    isPrefetched,
    onClickLikeButton,
    photo,
  }) {
  const {
    color,
    user: author = [],
    urls: photoUrls = [],
    id: photoId,
    height,
    width,
  } = photo
  const photoAlt = photo.alt_description ?? `photo by ${author.name}`
  const { profile_image: authorProfileImages } = author
  const {
    raw: rawPhotoUrl,
    full: fullPhotoUrl,
    regular: regularPhotoUrl,
    small: smallPhotoUrl,
    thumb: thumbnailPhotoUrl,
  } = photoUrls

  const renderedHeight = height / width * RENDERED_WIDTH
  const photoUrl = regularPhotoUrl || smallPhotoUrl || thumbnailPhotoUrl
  const photoProfileUrl = '/photo/' + (photoId ?? '')
  const authorProfileUrl =
    authorProfileImages?.large ||
    authorProfileImages?.medium ||
    authorProfileImages?.small

  const maxQualityPhotoUrl =
    rawPhotoUrl ||
    fullPhotoUrl ||
    regularPhotoUrl ||
    smallPhotoUrl

  return (
    <figure className={styles.self} data-test="image-card">
      <figcaption className={styles['author-menu-container']}>
        <ImageCardAuthor
          name={author.name}
          instagramUsername={author.instagram_username}
          imageUrl={authorProfileUrl}
        />
        <ImageCardMenu
          downloadPhotoUrl={maxQualityPhotoUrl}
          photoProfileUrl={photoProfileUrl}
          isLiked={isLiked}
          onClickLikeButton={onClickLikeButton}
          photoId={photoId}
        />
      </figcaption>

      <div className={styles['image-container']}>
        <div
          className={styles.image}
          style={{
            '--data-background-color': color,
          }}        >
          <Image
            alt={photoAlt}
            height={renderedHeight}
            priority={isPrefetched}
            src={photoUrl}
            style={{
              borderRadius: 'inherit',
              display: 'block',
            }}
            width={RENDERED_WIDTH}
          />
        </div>
      </div>
    </figure>
  )
}
