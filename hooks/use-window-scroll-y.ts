import { useEffect, useState } from 'react'
import { throttle } from '@/utils/helper-common'

export function useWindowScrollY(delayMs: number): number {
  const [ scrollY, setScrollY ] = useState<number>(0)

  const handleScroll = throttle(() => {
    setScrollY(window.scrollY)
  }, delayMs)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ delayMs, handleScroll ])

  return scrollY
}
