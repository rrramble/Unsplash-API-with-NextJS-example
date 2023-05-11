import Link from 'next/link'
import { MouseEvent } from 'react'
import { PlainFunction } from 'types/types'
import styles from './image-card-menu.module.scss'

type ImageCardMenuProps = {
  downloadPhotoUrl: string,
  isLiked: boolean,
  onClickLikeButton: PlainFunction,
  onClickDownload: (_evt: MouseEvent<HTMLAnchorElement>) => void,
  photoProfileUrl: string,
  savingFilename: string,
}

export default function ImageCardMenu(props: ImageCardMenuProps) {
  return (
    <menu className={styles.self}>
      <li
        className={styles['button-container']}
        data-test="menu-item--like"
      >
        <label>
          <span className="visually-hidden">Лайк</span>
          <input
            aria-label="Like status"
            checked={props.isLiked}
            className={`${styles.button} ${styles['button--like']}`}
            onChange={props.onClickLikeButton}
            type="checkbox"
          />
        </label>
      </li>

      <li className={styles['button-container']}
        data-test="menu-item--open"
      >
        <Link
          aria-label="Open profile of photo"
          className={`${styles.button} ${styles['button--open']}`}
          href={props.photoProfileUrl}
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
          aria-label="Download photo"
          className={`${styles.button} ${styles['button--download']}`}
          download={props.savingFilename}
          href={props.downloadPhotoUrl}
          onClick={props.onClickDownload}
          rel="noreferrer"
        >
          <span className="visually-hidden">Скачать фотографию</span>
        </a>
      </li>
    </menu>
  )
}
