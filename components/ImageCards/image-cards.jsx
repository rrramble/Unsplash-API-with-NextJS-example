import ImageCard from './image-card'
import styles from './image-cards.module.scss'

export default function ImageCards({ photos, likedPhotosIds = [], onClickLikeButton }) {
  return (
    <ul className={styles.self}>
      { photos.map((photo, index) =>
          <li
            className={styles.li}
            key={photo.id}
          >
            <ImageCard
              photo={photo}
              isLazy={index <= 3}
              isLiked={likedPhotosIds.includes(photo.id)}
              onClickLikeButton={() => onClickLikeButton && onClickLikeButton(photo.id)}
            />
        </li>
      )}
    </ul>
  )
}
