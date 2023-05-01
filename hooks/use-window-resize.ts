import { MutableRefObject, useEffect } from 'react'
import { useAppDispatch } from 'hooks/store'
import { setColumnCount } from 'store/actions'
import { throttle } from '@/utils/helper-common'

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
      const columnCountAsString: string = style.getPropertyValue('column-count') ?? '0'
      const columnCount = parseInt(columnCountAsString, 10)

      dispatch(setColumnCount(columnCount))
    }, timeoutMs)

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [ dispatch, layoutRef, timeoutMs ])
}
