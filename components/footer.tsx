import styles from './footer.module.scss'

type FooterProps = {
  onClick: () => void,
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
