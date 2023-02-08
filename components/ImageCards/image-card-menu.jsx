import Link from 'next/link'

import styles from './image-card-menu.module.scss'

export default function ImageCardMenu({
  downloadPhotoUrl,
  isLiked,
  savingFilename,
  onClickLikeButton,
  photoProfileUrl,
}) {
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
          aria-label="Open profile of photo"
          className={styles.button + ' ' + styles['button--open']}
          href={photoProfileUrl}
        >
          <span
            className="visually-hidden"
          >
            Открыть профиль фотографии
          </span>
        </Link>
      </li>

      <li className={styles['button-container']}
        data-test="menu-item--download"
      >
        <a
          className={styles.button + ' ' + styles['button--download']}
          download={savingFilename}
          href={downloadPhotoUrl}
          onClick={async evt => downloadPhotoByUrl(evt, downloadPhotoUrl, savingFilename)}
          rel="noreferrer"
        >
          <span className="visually-hidden">Скачать фотографию</span>
        </a>
      </li>
    </menu>
  )
}

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
