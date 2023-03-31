import Image from 'next/image'
import { CSSProperties } from 'react'
import Author from './author'
import Menu from './menu'
import SimilarTags from './similar-tags'
import styles from './photo.module.scss'
import { Photo as PhotoType, RelatedCollections } from 'types/photos'
import { PlainFunction } from 'types/types'

type PhotoProps = {
  isLiked: boolean,
  onClickLikeButton: PlainFunction,
  photo: PhotoType,
  relatedTags: RelatedCollections,
}

interface CSSPropertiesWithVars extends CSSProperties {
  '--data-background-color'?: string,
  '--data-url'?: string,
  '--data-with-url-tag'?: string,
}

export default function Photo(props: PhotoProps) {
  const {
    id: photoId,
    color: backgroundColor,
    height,
    urls: photoUrls,
    user: author,
    width,
  } = props.photo || {}

  const {
    full: fullPhotoUrl,
    raw: rawPhotoUrl,
    regular: regularPhotoUrl,
    small: smallPhotoUrl,
    thumb: thumbPhotoUrl,
  } = photoUrls || {}

  const {
    profile_image: authorProfileImages,
  } = author || {}

  const photoAlt = props.photo?.alt_description ??
    `Фотография от автора: ${author?.name}`

  const maxQualityPhotoUrl = rawPhotoUrl ?? fullPhotoUrl ?? regularPhotoUrl ?? smallPhotoUrl
  const photoUrl = fullPhotoUrl || regularPhotoUrl || smallPhotoUrl || thumbPhotoUrl
  const smallQualityPhotoUrl = smallPhotoUrl ?? thumbPhotoUrl ?? regularPhotoUrl
  const savingFilename = `${photoAlt}-${photoId}`

  const authorProfileUrl =
    authorProfileImages?.large ||
    authorProfileImages?.medium ||
    authorProfileImages?.small

  const figureStyle: CSSPropertiesWithVars = {
    '--data-background-color': backgroundColor.toString(),
    '--data-with-url-tag': `url(${smallQualityPhotoUrl})`,
  }

  const imageStyle: CSSPropertiesWithVars = {
    '--data-background-color': backgroundColor.toString(),
    '--data-url': photoUrl,
    'height': 'auto',
    'width': '100%',
  }

  return (
    <figure
      className={styles.self}
      style={figureStyle}
    >
      <figcaption
        className={styles.header}
      >
        <Author
          imageUrl={authorProfileUrl}
          instagramUsername={author?.instagram_username}
          name={author?.name}
        />

        <Menu
          isLiked={props.isLiked}
          downloadPhotoUrl={maxQualityPhotoUrl}
          onClickLikeButton={props.onClickLikeButton}
          savingFilename={savingFilename}
        />
      </figcaption>

      <div
        className={styles['photo-container']}
      >
        <Image
          alt={photoAlt}
          height={height}
          priority
          src={photoUrl}
          style={imageStyle}
          width={width}
        />
      </div>

      <section>
        <SimilarTags tags={props.relatedTags} />
      </section>
    </figure>)
}
