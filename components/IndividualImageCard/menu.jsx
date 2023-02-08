import styles from './menu.module.scss'

export default function IndividualImageMenu({
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
          onClick={async evt => downloadPhotoByUrl(evt, downloadPhotoUrl, savingFilename)}
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

// TODO: extract to outer function or component
async function downloadPhotoByUrl(evt, url, filename) {
  evt.preventDefault()
  const image = await fetch(url)
  const blob = await image.blob()
  const imageURL = URL.createObjectURL(blob)
  const el = document.createElement('a')
  el.href = imageURL
  el.download = filename ?? `${url}.jpeg`
  el.style.display = 'none'
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
}
