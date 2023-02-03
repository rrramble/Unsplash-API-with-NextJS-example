import Author from './author'
import Menu from './menu'
import SimilarTags from './similar-tags'

import styles from './photo.module.scss'

export default function IndividualImageCard({ photo = [], isLiked, onClickLikeButton, relatedTags }) {
  const {
    urls: photoUrls,
    color: backgroundColor,
    user: author,
  } = photo || {}

  const {
      full: fullPhotoUrl,
      regular: regularPhotoUrl,
      small: smallPhotoUrl,
      thumb: thumbPhotoUrl,
  } = photoUrls || {}

  const photoUrl = regularPhotoUrl || fullPhotoUrl || smallPhotoUrl || thumbPhotoUrl

  const {
      profile_image: authorProfileImages,
  } = author || {}

  const photoAlt = photo?.alt_descrtiption ??
    `Фотография от автора: ${author?.name}`

  const authorProfileUrl =
    authorProfileImages?.large ||
    authorProfileImages?.medium ||
    authorProfileImages?.small

  return (
    <div
      className={styles.self}
    >
      <header
        className={styles.header}
      >
        <Author
          name={author?.name}
          instagramUsername={author?.instagram_username}
          imageUrl={authorProfileUrl}
        />

        <Menu
          isLiked={isLiked}
          onClickLikeButton={onClickLikeButton}
        />
      </header>

      <img
          className={styles['photo-container']}
          src={photoUrl}
          alt={photoAlt}
          style={{'--data-background-color': backgroundColor}}
        />

      <aside>
        <SimilarTags tags={relatedTags} />
      </aside>
    </div>)
}