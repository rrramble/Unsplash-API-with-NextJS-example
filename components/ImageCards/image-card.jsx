import ImageCardAuthor from './image-card-author'
import ImageCardMenu from './image-card-menu'

import styles from './image-card.module.scss'

export default function ImageCard({ photo, isLiked, onClickLikeButton }) {
  const {
    user: author = [],
    urls: photoUrls = [],
    id: photoId,
    alt_description: photoAlt = `photo by ${author.name}` ,
  } = photo;
  const { profile_image } = author
  const {
    full: fullPhotoUrl,
    regular: regularPhotoUrl,
    small: smallPhotoUrl,
    thumb: thumbnailPhotoUrl,
  } = photoUrls

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

      <picture className={styles['image-container']}>
        <source className={styles.image} srcSet={fullPhotoUrl + ' 2x, ' + regularPhotoUrl} media="(min-width: 660px)" />
        <source className={styles.image} srcSet={regularPhotoUrl + ' 2x, ' + smallPhotoUrl ?? thumbnailPhotoUrl} media="(min-width: 320px)" />
        <img
          alt={photoAlt}
          className={styles.image}
          data-test="image-card__image"
          loading="lazy"
          src={thumbnailPhotoUrl}
        />
      </picture>
    </figure>
  )
}
