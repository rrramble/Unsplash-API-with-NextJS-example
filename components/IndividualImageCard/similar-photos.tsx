import ImageCards from '@/components/ImageCards/image-cards'

import styles from './similar-photos.module.scss'

export default function SimilarPhotos ({
  likedPhotosIds,
  onClickLikeButton,
  photos,
}) {
  return (
    <div
      className={styles.self}
    >
      <header
        className={styles.header}
      >
        Похожие фотографии
      </header>
      <ImageCards
        photos={photos}
        likedPhotosIds={likedPhotosIds}
        onClickLikeButton={onClickLikeButton}
      />
    </div>
  )
}
