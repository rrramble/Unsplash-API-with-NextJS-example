import Image from 'next/image'

import ImageCardAuthor from './image-card-author'
import ImageCardMenu from './image-card-menu'

import styles from './image-card.module.scss'

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

  const savingFilename = `${photoAlt}-${photoId}`

  return (
    <figure className={styles.self} data-test="image-card">
      <figcaption className={styles['author-menu-container']}>
        <ImageCardAuthor
          imageUrl={authorProfileUrl}
          instagramUsername={author.instagram_username}
          name={author.name}
        />
        <ImageCardMenu
          downloadPhotoUrl={maxQualityPhotoUrl}
          isLiked={isLiked}
          onClickLikeButton={onClickLikeButton}
          photoId={photoId}
          photoProfileUrl={photoProfileUrl}
          savingFilename={savingFilename}
        />
      </figcaption>

      <div
        className={styles['image']}
        style={{
          '--data-background-color': color,
        }}
      >
        <Image
          alt={photoAlt}
          fill={true}
          priority={isPrefetched}
          src={photoUrl}
          style={{
            borderRadius: 'inherit',
            display: 'block',
          }}
        />
      </div>
    </figure>
  )
}
