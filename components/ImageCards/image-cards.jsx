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
  const [ twoColumnsMaxHeight, setTwoColumnsMaxHeight ] = useState(
    INITIAL_MAX_HEIGTH
  )
  const [ threeColumnsMaxHeight, setThreeColumnsMaxHeight ] = useState(
    INITIAL_MAX_HEIGTH
  )

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
    const twoColumnsSumHeight = calcColumnsSumHeight(
      photos, 2, ROW_GAP, renderedWidth
    )
    const threeColumnsSumHeight = calcColumnsSumHeight(
      photos, 3, ROW_GAP, renderedWidth
    )
    setTwoColumnsMaxHeight(twoColumnsSumHeight)
    setThreeColumnsMaxHeight(threeColumnsSumHeight)
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

function sumRenderedHeightsByColumns(
  items,
  columnCount,
  renderedWidth,
) {
  const nullishHeights = Array(columnCount).fill(0)
  const nullishRowCounts = Array(columnCount).fill(0)

  const results = items.reduce((
    [columnHeights, rowCounts], { height, width }, index
  ) => {
    // 1 is correction for 1px of rounding fractions in web browsers
    const ratio = width / (renderedWidth + 1)

    const columnNumber = index % columnCount
    columnHeights[columnNumber] += height / ratio
    rowCounts[columnNumber] += 1
    return [ columnHeights, rowCounts ]
  }, [nullishHeights, nullishRowCounts])

  return results
}

function calcColumnsSumHeight(
  items,
  columnCount,
  rowGap,
  renderedWidth,
) {
  const [ columnSumHeights, rowCounts ] = sumRenderedHeightsByColumns(
    items, columnCount, renderedWidth
  )
  const maxSumHeight = Math.max(...columnSumHeights)
  const index = columnSumHeights.indexOf(maxSumHeight)
  const rowCount = rowCounts[index]
  const result = Math.ceil(maxSumHeight + (rowCount - 1) * rowGap)
  return result
}
