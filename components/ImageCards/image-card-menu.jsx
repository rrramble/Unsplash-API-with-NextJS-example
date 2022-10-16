import Link from 'next/link'

import styles from './image-card-menu.module.scss'

export default function ImageCardMenu({ photoProfileUrl, isLiked, onClickLikeButton }) {
  const likeButtonText = isLiked ?
    'Убрать лайк' :
    'Лайк!'

  return (
    <menu className={styles.self}>
      <li className={styles['button-container']}
        data-test="menu-item--like"
      >
        <span className="visually-hidden">{likeButtonText}</span>
        <input
          aria-label="Like status"
          className={styles.button + ' ' + styles['button--like']}
          type="checkbox"
          name="like-toggle"
          checked={isLiked}
          onChange={onClickLikeButton}
        />
      </li>

      <li className={styles['button-container']}
        data-test="menu-item--open"
      >
        <Link
          href={photoProfileUrl}
        >
          <a
            aria-label="Open profile of photo"
            className={styles.button + ' ' + styles['button--open']}
          >
            <span
              className="visually-hidden"
            >
                Открыть профиль фотографии
            </span>
          </a>
        </Link>
      </li>

      <li className={styles['button-container']}
        data-test="menu-item--download"
      >
        <button
          aria-label="Download photo"
          className={styles.button + ' ' + styles['button--download']}
          type="button"
        >
          <span className="visually-hidden">Скачать</span>
        </button>
      </li>
    </menu>
  )
}
