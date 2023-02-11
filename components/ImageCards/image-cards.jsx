import { useEffect, useRef, useState } from 'react'

import ImageCard from './image-card'
import styles from './image-cards.module.scss'

const INITIAL_MAX_HEIGTH = 20000;
const ROW_GAP = 26

export default function ImageCards({
  likedPhotosIds = [],
  onClickLikeButton,
  photos,
}) {

  const liRef = useRef()
  const [ twoColumnsMaxHeight, setTwoColumnsMaxHeight ] = useState(INITIAL_MAX_HEIGTH)
  const [ threeColumnsMaxHeight, setThreeColumnsMaxHeight ] = useState(INITIAL_MAX_HEIGTH)
  const [ randomNumber, setRandomNumber] = useState(0)

  const onResizeWindow = () => {
    setRandomNumber(Math.random())
  }

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow)
    return () => {
      window.removeEventListener('resize', onResizeWindow)
    }
  })

  useEffect(() => {
    const renderedWidth = liRef?.current?.clientWidth
    if (!renderedWidth) {
      return
    }
    const [ { width: firstPhotoWidth} ] = photos
    const ratio = firstPhotoWidth / renderedWidth
    const twoColumnsTableHeight = calcMaxColumnHeight(photos, 2, ROW_GAP, ratio)
    const threeColumnsTableHeight = calcMaxColumnHeight(photos, 3, ROW_GAP, ratio)
    setTwoColumnsMaxHeight(twoColumnsTableHeight)
    setThreeColumnsMaxHeight(threeColumnsTableHeight)
  }, [liRef, randomNumber])

  return (
    <ul
      className={styles.self}
      random={randomNumber}
      style={{
        '--data-max-height-2-columns': twoColumnsMaxHeight + 'px',
        '--data-max-height-3-columns': threeColumnsMaxHeight + 'px',
      }}
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
            ref={index === 0 ? liRef : null}
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

function sumColumnsHeights(items, columnCount) {
  const nullushArray = Array(columnCount).fill(0)

  const heights = items.reduce((accu, { height }, index) => {
    const columnNumber = index % columnCount
    accu[columnNumber] += height
    return accu
  }, nullushArray)

  return heights
}

function calcMaxColumnHeight(items, columnCount, rowGap, ratio) {
  const heights = sumColumnsHeights(items, columnCount)
  const rowCount = Math.ceil(items.length / columnCount)
  const maxHeight = Math.max(...heights) / ratio
  return Math.ceil(maxHeight) + (rowCount - 1) * rowGap
}
