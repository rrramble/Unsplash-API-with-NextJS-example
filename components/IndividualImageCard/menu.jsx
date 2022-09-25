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
            className={`${styles.button} ${styles['button--like']}`}
            type="checkbox"
            name="like-toggle"
            id="like-toggle"
            checked={isLiked}
            onChange={onClickLikeButton}
          />
        </label>
      </li>
      <li className={styles['button-container']}>
          <button
            type="button"
            className={`${styles.button} ${styles['button--download']}`}
          >
            <span className="visually-hidden">Скачать фотографию</span>
          </button>
      </li>
    </menu>
  )
}
