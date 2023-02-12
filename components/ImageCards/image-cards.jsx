import ImageCard from './image-card'
import styles from './image-cards.module.scss'

export default function ImageCards({
  likedPhotosIds = [],
  onClickLikeButton,
  photos,
}) {
  return (
    <ul
      className={styles.self}
    >
      { photos.map((photo, index) => {
        return (
          <li
            className={styles.item}
            key={photo.id}
          >
            <ImageCard
              isLiked={likedPhotosIds.includes(photo.id)}
              isPrefetched={index <= 2}
              onClickLikeButton={() => onClickLikeButton && onClickLikeButton(photo.id)}
              photo={photo}
            />
          </li>
        )
      })}
    </ul>
  )
}
