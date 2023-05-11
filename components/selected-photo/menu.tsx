import { PlainFunction } from 'types/types'
import { getOnClickDownload } from '@/utils/helper-browser'
import styles from './menu.module.scss'

type MenuProps = {
  downloadPhotoUrl: string,
  isLiked: boolean,
  onClickLikeButton: PlainFunction,
  savingFilename: string,
}

export default function Menu(props: MenuProps) {
  return (
    <menu className={styles.self}>
      <li className={styles['button-container']}>
        <label
        >
          <span className="visually-hidden">Лайк</span>
          <input
            checked={props.isLiked}
            className={`${styles.button} ${styles['button--like']}`}
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
          onClick={getOnClickDownload(props.downloadPhotoUrl, props.savingFilename)}
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
