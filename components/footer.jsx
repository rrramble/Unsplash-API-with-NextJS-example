import styles from './footer.module.scss'


export default function Footer({ onClick }) {
  return (
    <button
      className={styles['go-up-button']}
      onClick={onClick}
    >
      <span className='visually-hidden'>
          В начало страницы
      </span>
    </button>
  )
}
