import { useRef } from 'react'
import ImageCard from './image-card'
import styles from './image-cards.module.scss'
import { PhotoIds, PhotoId, Photos } from 'types/photos'
import { useWindowResize } from 'hooks/use-window-resize'
import { WINDOW_RESIZE_THROTTLE_DELAY_MS } from 'consts/consts'

type ImageCardsProps = {
  likedPhotosIds: PhotoIds,
  onClickLikeButton: (id: PhotoId) => void,
  photos: Photos,
}

export default function ImageCards({
  likedPhotosIds = [],
  onClickLikeButton,
  photos,
}: ImageCardsProps) {
  const layoutRef = useRef()

  useWindowResize(layoutRef, WINDOW_RESIZE_THROTTLE_DELAY_MS)

  return (
    <ul
      className={styles.self}
      ref={layoutRef}
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
