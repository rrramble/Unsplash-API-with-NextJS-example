import styles from './menu.module.scss'
import { downloadPhotoByUrl } from '@/utils/helper-browser'

export default function Menu({
  downloadPhotoUrl,
  isLiked,
  onClickLikeButton,
  savingFilename,
}) {
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
        <a
          className={`${styles.button} ${styles['button--download']}`}
          download={savingFilename}
          href={downloadPhotoUrl}
          onClick={async evt =>
            onClickDownload(evt, downloadPhotoUrl, savingFilename)
          }
          rel="noreferrer"
        >
          <span
            className="visually-hidden">Скачать фотографию
          </span>
        </a>
      </li>
    </menu>
  )
}

async function onClickDownload(evt, url, savingFilename) {
  evt.preventDefault()
  await downloadPhotoByUrl(url, savingFilename)
}
