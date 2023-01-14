import Author from './author'
import Menu from './menu'

import styles from './individual-image-card.module.scss'

export default function IndividualImageCard({ photo = [], isLiked, onClickLikeButton }) {
  const {
    alt_description: photoAlt = 'Описание отсутствует',
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

  const photoUrl = regularPhotoUrl && smallPhotoUrl && fullPhotoUrl && thumbPhotoUrl

  const {
      name: authorName,
      profile_image: authorProfileImages,
      instagram_username: instagramUsername,
  } = author || {}

  const authorProfileUrl =
    authorProfileImages?.large ||
    authorProfileImages?.medium ||
    authorProfileImages?.small || null

  return (
    <div
      className={styles.self}
    >
      <header
        className={styles.header}
      >
        <Author
          name={authorName ?? null}
          instagramUsername={instagramUsername ?? null}
          imageUrl={authorProfileUrl ?? null}
        />

        <Menu
          isLiked={isLiked}
          onClickLikeButton={onClickLikeButton}
        />
      </header>

    { photoUrl &&
      <img
        className={styles['photo-container']}
        src={photoUrl}
        alt={photoAlt}
        style={{'--data-background-color': backgroundColor}}
      />
    }
  </div>)
}
