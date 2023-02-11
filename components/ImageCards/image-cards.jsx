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
        const { height = '1', width = '1' } = photo
        return (
          <li
            className={styles.item}
            key={photo.id}
            style={{
              aspectRatio: `auto ${width} / ${height}`,
            }}
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
