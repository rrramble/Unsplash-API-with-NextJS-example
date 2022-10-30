import ImageCard from './image-card'
import styles from './image-cards.module.scss'

export default function ImageCards({ photos, likedPhotosIds = [], onClickLikeButton }) {
  return (
    <ul className={styles.self}>
      { photos.map(photo =>
          <li
            className={styles.li}
            key={photo.id}
          >
            <ImageCard
              photo={photo}
              isLiked={likedPhotosIds.includes(photo.id)}
              onClickLikeButton={() => onClickLikeButton && onClickLikeButton(photo.id)}
            />
        </li>
      )}
    </ul>
  )
}
