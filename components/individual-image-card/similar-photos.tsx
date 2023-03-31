import ImageCards from '@/components/image-cards/image-cards'
import styles from './similar-photos.module.scss'

export default function SimilarPhotos({
  likedPhotosIds,
  onClickLikeButton,
  photos,
}) {
  return (
    <div
      className={styles.self}
    >
      <div className={styles.header}>
        <header
          className={styles.title}
        >
          Похожие фотографии
        </header>
        <button className={styles['show-more']}>
          <span className="visually-hidden">Показать больше</span>
        </button>
      </div>

      <ImageCards
        photos={photos}
        likedPhotosIds={likedPhotosIds}
        onClickLikeButton={onClickLikeButton}
      />
    </div>
  )
}
