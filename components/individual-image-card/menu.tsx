import styles from './menu.module.scss'
import { downloadPhotoByUrl } from '@/utils/helper-browser'

type MenuProps = {
  downloadPhotoUrl: string,
  isLiked: boolean,
  onClickLikeButton: () => void,
  savingFilename: string,
}

export default function Menu(props: MenuProps) {
  const likeButtonText = props.isLiked ?
    'Убрать лайк' :
    'Поставить лайк'

  return (
    <menu className={styles.self}>
      <li className={styles['button-container']}>
        <label
        >
          <span className="visually-hidden">{likeButtonText}</span>
          <input
            checked={props.isLiked}
            className={`${styles.button} ${styles['button--like']}`}
            id="like-toggle"
            name="like-toggle"
            onChange={props.onClickLikeButton}
            type="checkbox"
          />
        </label>
      </li>
      <li className={styles['button-container']}>
        <a
          className={`${styles.button} ${styles['button--download']}`}
          download={props.savingFilename}
          href={props.downloadPhotoUrl}
          onClick={async evt =>
            onClickDownload(evt, props.downloadPhotoUrl, props.savingFilename)
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
