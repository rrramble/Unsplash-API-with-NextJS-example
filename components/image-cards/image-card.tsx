import Image from 'next/image'
import { CSSProperties } from 'react'
import { Photo } from 'types/photos'
import ImageCardAuthor from './image-card-author'
import ImageCardMenu from './image-card-menu'
import styles from './image-card.module.scss'

// This constant must be the same as in 'varibales.scss'
const SCREEN__BIG = 768

interface CSSPropertiesWithVars extends CSSProperties {
  '--data-background-color'?: string,
  '--data-aspect-ratio'?: string,
}

type ImageCardProps = {
  isLiked: boolean,
  isPrefetched: boolean,
  onClickLikeButton: () => void,
  photo: Photo,
}

export default function ImageCard({
  isLiked,
  isPrefetched,
  onClickLikeButton,
  photo,
}: ImageCardProps) {

  const {
    color,
    height,
    user: author,
    urls: photoUrls = {},
    id: photoId,
    width,
  } = photo
  const photoAlt = photo.alt_description ?? `photo by ${author.name}`
  const { profile_image: authorProfileImages } = author
  const {
    raw: rawPhotoUrl,
    full: fullPhotoUrl,
    regular: regularPhotoUrl,
    small: smallPhotoUrl,
    thumb: thumbnailPhotoUrl,
  } = photoUrls

  const photoUrl = regularPhotoUrl || smallPhotoUrl || thumbnailPhotoUrl
  const photoProfileUrl = '/photo/' + (photoId ?? '')
  const authorProfileUrl =
    authorProfileImages?.large ||
    authorProfileImages?.medium ||
    authorProfileImages?.small

  const maxQualityPhotoUrl =
    rawPhotoUrl ||
    fullPhotoUrl ||
    regularPhotoUrl ||
    smallPhotoUrl

  const savingFilename = `${photoAlt}-${photoId}`


  const backgroundColorStyle: CSSPropertiesWithVars = {
    '--data-background-color': color.toString(),
  }
  const aspectRatioStyle: CSSPropertiesWithVars = {
    '--data-aspect-ratio': (width / height).toString(),
  }

  return (
    <figure
      className={styles.self} data-test="image-card"
      style={backgroundColorStyle}
    >
      <div
        className={styles['image']}
        style={{
          aspectRatio: `auto ${width} / ${height}`,
        }}
      >
        <Image
          alt={photoAlt}
          fill={true}
          priority={isPrefetched}
          sizes={`
            (min-width: ${SCREEN__BIG}px) 45vw,
            90vw
          `}
          src={photoUrl}
          style={{
            borderRadius: 'inherit',
            display: 'block',
            aspectRatio: 'inherit',
          }}
        />
      </div>

      <figcaption className={styles['author-menu-container']}>
        <ImageCardAuthor
          imageUrl={authorProfileUrl}
          instagramUsername={author.instagram_username}
          name={author.name}
        />

        <div
          className={styles.gutter}
          style={aspectRatioStyle}
        >.
        </div>
        <ImageCardMenu
          downloadPhotoUrl={maxQualityPhotoUrl}
          isLiked={isLiked}
          onClickLikeButton={onClickLikeButton}
          photoProfileUrl={photoProfileUrl}
          savingFilename={savingFilename}
        />
      </figcaption>
    </figure>
  )
}
