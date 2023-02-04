import styles from './footer.module.scss'


export default function Footer({ onClick }) {
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
