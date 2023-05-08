import { useWindowScrollY } from 'hooks/use-window-scroll-y'
import { PlainFunction } from 'types/types'
import styles from './footer.module.scss'
import { useEffect, useState } from 'react'

type FooterProps = {
  onClick: PlainFunction,
}

export default function Footer({ onClick }: FooterProps): JSX.Element {
  const scrollY = useWindowScrollY(0)
  const [ isHidden, setIsHidden ] = useState<boolean>(true)

  useEffect(()  => {
    setIsHidden(scrollY === 0)
  }, [ scrollY ])

  if (isHidden) {
    return <></>
  }

  return (
    <button
      className={styles.self}
      onClick={onClick}
    >
      <span className='visually-hidden'>
        Перейти к началу страницы
      </span>
    </button>
  )
}
