import { MutableRefObject, useEffect } from 'react'
import { useAppDispatch } from 'hooks/store'
import { throttle } from '@/utils/helper-common'
import { setColumnCount } from 'store/actions'

export function useWindowResize(
    layoutRef: MutableRefObject<HTMLElement | null>,
    timeoutMs: number
) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleWindowResize = throttle(() => {
      if (!layoutRef.current) {
        return
      }
      const style = window.getComputedStyle(layoutRef.current)
      const columnCountAsString: string = style['column-count'] || '0'
      const columnCount = parseInt(columnCountAsString, 10)
      dispatch(setColumnCount(columnCount))
    }, timeoutMs)

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [dispatch, layoutRef, timeoutMs])
}
