import Link from 'next/link'
import { downloadPhotoByUrl } from '@/utils/helper-browser'
import styles from './image-card-menu.module.scss'
import { PlainFunction } from 'types/types'

type ImageCardMenuProps = {
  downloadPhotoUrl: string,
  isLiked: boolean,
  onClickLikeButton: PlainFunction,
  photoProfileUrl: string,
  savingFilename: string,
}

export default function ImageCardMenu(props: ImageCardMenuProps) {
  const likeButtonText = props.isLiked ?
    'Убрать лайк' :
    'Лайк!'

  return (
    <menu className={styles.self}>
      <li
        className={styles['button-container']}
        data-test="menu-item--like"
      >
        <span className="visually-hidden">{likeButtonText}</span>
        <input
          aria-label="Like status"
          checked={props.isLiked}
          className={styles.button + ' ' + styles['button--like']}
          name="like-toggle"
          onChange={props.onClickLikeButton}
          type="checkbox"
        />
      </li>

      <li className={styles['button-container']}
        data-test="menu-item--open"
      >
        <Link
          aria-label="Open profile of photo"
          className={styles.button + ' ' + styles['button--open']}
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
          className={styles.button + ' ' + styles['button--download']}
          download={props.savingFilename}
          href={props.downloadPhotoUrl}
          onClick={async evt =>
            onClickDownload(evt, props.downloadPhotoUrl, props.savingFilename)
          }
          rel="noreferrer"
        >
          <span className="visually-hidden">Скачать фотографию</span>
        </a>
      </li>
    </menu>
  )
}
// FIXME: filenames are different between 'image-cards/image-card-menu' and 'individual-image-card/menu'
async function onClickDownload(evt, url: string, savingFilename: string) {
  evt.preventDefault()
  await downloadPhotoByUrl(url, savingFilename)
}
