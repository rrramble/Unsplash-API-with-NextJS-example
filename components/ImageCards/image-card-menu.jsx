import Link from 'next/link'

import styles from './image-card-menu.module.scss'

export default function ImageCardMenu({ imageId, isLiked, onClickLikeButton }) {
  const likeButtonText = isLiked ?
    'Убрать лайк' :
    'Лайк!'

  return (
    <menu className={styles.main}>
      <li className={styles['button-container']}>
        <span className="visually-hidden">{likeButtonText}</span>
        <input
          className={styles.button + ' ' + styles['button--like']}
          type="checkbox"
          name="like-toggle"
          checked={isLiked}
          onChange={onClickLikeButton}
        />
      </li>

      <li className={styles['button-container']}>
        <Link
          href={'/photo/' + (imageId ?? '')}
        >
          <a
            className={styles.button + ' ' + styles['button--enlarge']}
          >
            <span
              className="visually-hidden"
            >
                Открыть фотографию
            </span>
          </a>
        </Link>
      </li>

      <li className={styles['button-container']}>
        <button
          className={styles.button + ' ' + styles['button--download']}
          type="button"
        >
          <span className="visually-hidden">Скачать</span>
        </button>
      </li>
    </menu>
  )
}
