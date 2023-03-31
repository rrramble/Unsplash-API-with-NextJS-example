import { useWindowScrollY } from 'hooks/use-window-scroll-y'
import { PlainFunction } from 'types/types'
import styles from './footer.module.scss'

type FooterProps = {
  onClick: PlainFunction,
}

export default function Footer({ onClick }: FooterProps) {
  const scrollY = useWindowScrollY(300)
  const buttonAdditionalClassName = scrollY === 0 ?
    styles['self--hidden'] :
    ''

  return (
    <button
      className={`${styles.self} ${buttonAdditionalClassName}`}
      onClick={onClick}
    >
      <span className='visually-hidden'>
        Перейти к началу страницы
      </span>
    </button>
  )
}
