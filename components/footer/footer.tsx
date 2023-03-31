import { PlainFunction } from 'types/types'
import styles from './footer.module.scss'

type FooterProps = {
  onClick: PlainFunction,
}

export default function Footer({ onClick }: FooterProps) {
  return (
    <button
      className={styles['go-up-button']}
      onClick={onClick}
    >
      <span className='visually-hidden'>
        Перейти к началу страницы
      </span>
    </button>
  )
}
