import styles from './menu.module.scss'

export default function IndividualImageMenu({ isLiked, onClickLikeButton }) {
  const likeButtonText = isLiked ?
    'Убрать лайк' :
    'Поставить лайк'

  return (
    <menu className={styles.self}>
      <li className={styles['button-container']}>
        <label
        >
          <span className="visually-hidden">{likeButtonText}</span>
          <input
            checked={isLiked}
            className={`${styles.button} ${styles['button--like']}`}
            id="like-toggle"
            name="like-toggle"
            onChange={onClickLikeButton}
            type="checkbox"
          />
        </label>
      </li>
      <li className={styles['button-container']}>
          <button
            className={`${styles.button} ${styles['button--download']}`}
            type="button"
          >
            <span
              className="visually-hidden">Скачать фотографию
            </span>
          </button>
      </li>
    </menu>
  )
}
