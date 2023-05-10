import { useRef } from 'react'
import { useWindowResize } from 'hooks/use-window-resize'
import ImageCard from '@/components/image-card/image-card'
import { WINDOW_RESIZE_THROTTLE_DELAY_MS } from 'consts/consts'
import { PhotoIds, PhotoId, Photos } from 'types/photos'
import styles from './image-cards.module.scss'

type ImageCardsProps = {
  likedPhotosIds: PhotoIds,
  onClickLikeButton: (_id: PhotoId) => void,
  photos: Photos,
}

export default function ImageCards({
  likedPhotosIds = [],
  onClickLikeButton,
  photos,
}: ImageCardsProps) {
  const layoutRef = useRef<HTMLUListElement>(null)

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
              onClickLikeButton={() => onClickLikeButton(photo.id)}
              photo={photo}
            />
          </li>
        )
      })}
    </ul>
  )
}
