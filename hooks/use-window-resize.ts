import { MutableRefObject, useEffect } from 'react'
import { useAppContext } from '@/context/app-context'
import { throttle } from '@/utils/helper-browser'

export function useWindowResize(
    layoutRef: MutableRefObject<HTMLElement | null>,
    timeoutMs: number
) {
  const { dispatch } = useAppContext()

  useEffect(() => {
    const handleWindowResize = throttle(() => {
      if (!layoutRef.current) {
        return
      }
      const style = window.getComputedStyle(layoutRef.current, null)
      const columnCountAsString = style['column-count'] || '0'
      const columnCount = parseInt(columnCountAsString, 10)
      dispatch({ type: 'SAVE_PHOTO_COLUMN_COUNT', payload: columnCount })
    }, timeoutMs)

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    };
  }, [dispatch, layoutRef, timeoutMs])
}
