import { useEffect, useState } from 'react'
import { throttle } from '@/utils/helper-browser'

export function useWindowScrollY(delayMs: number): number {
  const [ scrollY, setScrollY ] = useState<number>(0)

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)
    }, delayMs)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [delayMs])

  return scrollY
}
