import ImageCard from './image-card'
import styles from './image-cards.module.scss'

const RENDERED_WIDTH = 476
const ROW_HEIGHT = 1
const IMAGE_BOTTOM_MARGIN = 26

export default function ImageCards({ photos, likedPhotosIds = [], onClickLikeButton }) {
  return (
    <ul className={styles.self}>
      { photos.map(photo => {
          const { height, width } = photo
          const rowSpanCount = Math.floor((height / width * RENDERED_WIDTH + IMAGE_BOTTOM_MARGIN) / ROW_HEIGHT + 1)

          return <li
            key={photo.id}
            style={{gridRow: 'span ' + rowSpanCount}}
          >
            <ImageCard
              photo={photo}
              isLiked={likedPhotosIds.includes(photo.id)}
              onClickLikeButton={() => onClickLikeButton && onClickLikeButton(photo.id)}
            />
          </li>
      })}
    </ul>
  )
}
