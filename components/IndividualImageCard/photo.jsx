import Image from 'next/image'

import Author from './author'
import Menu from './menu'
import SimilarTags from './similar-tags'

import styles from './photo.module.scss'

export default function IndividualImageCard({ photo, isLiked, onClickLikeButton, relatedTags }) {
  const {
    color: backgroundColor,
    height,
    urls: photoUrls,
    user: author,
    width,
  } = photo || {}

  const {
      full: fullPhotoUrl,
      raw: rawPhotoUrl,
      regular: regularPhotoUrl,
      small: smallPhotoUrl,
      thumb: thumbPhotoUrl,
  } = photoUrls || {}

  const photoUrl = fullPhotoUrl || regularPhotoUrl || smallPhotoUrl || thumbPhotoUrl

  const {
      profile_image: authorProfileImages,
  } = author || {}

  const photoAlt = photo?.alt_descrtiption ??
    `Фотография от автора: ${author?.name}`

  const maxQualityPhotoUrl = rawPhotoUrl ?? fullPhotoUrl ?? regularPhotoUrl ?? smallPhotoUrl
  const smallQualityPhotoUrl = smallPhotoUrl ?? thumbPhotoUrl ?? regularPhotoUrl
  const authorProfileUrl =
    authorProfileImages?.large ||
    authorProfileImages?.medium ||
    authorProfileImages?.small

  return (
    <figure
      className={styles.self}
      style={{
        '--data-background-color': backgroundColor,
        '--data-with-url-tag': `url(${smallQualityPhotoUrl})`,
      }}
    >
      <figcaption
        className={styles.header}
      >
        <Author
          imageUrl={authorProfileUrl}
          instagramUsername={author?.instagram_username}
          name={author?.name}
        />

        <Menu
          isLiked={isLiked}
          downloadPhotoUrl={maxQualityPhotoUrl}
          onClickLikeButton={onClickLikeButton}
        />
      </figcaption>

      <div
        className={styles['photo-container']}
      >
        <Image
          alt={photoAlt}
          height={height}
          priority
          src={photoUrl}
          style={{
            '--data-background-color': backgroundColor,
            '--data-url': photoUrl,
            'height': 'auto',
            'width': '100%',
          }}
          width={width}
        />
      </div>

      <section>
        <SimilarTags tags={relatedTags} />
      </section>
    </figure>)
}
