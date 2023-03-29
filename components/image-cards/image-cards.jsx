import { useEffect, useRef } from 'react'
import { useAppContext } from '@/context/AppContext'
import { throttle } from '@/utils/helper-browser'
import ImageCard from './image-card'
import styles from './image-cards.module.scss'

export default function ImageCards({
  likedPhotosIds = [],
  onClickLikeButton,
  photos,
}) {
  const { dispatch } = useAppContext()
  const layoutRef = useRef()

  useEffect(() => {
    const handleWindowResize = throttle(() => {
      const style = window.getComputedStyle(layoutRef.current, null)
      const columnCountAsString = style['column-count'] || '0'
      const columnCount = parseInt(columnCountAsString, 10)
      dispatch({ type: 'SAVE_PHOTO_COLUMN_COUNT', payload: columnCount })
    }, 100)

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    };
  }, [dispatch])

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
