import { MutableRefObject, useEffect } from 'react'
import { useAppDispatch } from 'hooks/store'
import { throttle } from '@/utils/helper-common'
import { saveColumnCount } from 'store/actions'

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
      const style = window.getComputedStyle(layoutRef.current, null)
      const columnCountAsString = style['column-count'] || '0'
      const columnCount = parseInt(columnCountAsString, 10)
      dispatch(saveColumnCount(columnCount))
    }, timeoutMs)

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    };
  }, [dispatch, layoutRef, timeoutMs])
}
