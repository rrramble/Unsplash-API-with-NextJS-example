import { Dispatch, useMemo } from 'react'
import { AppContextState } from 'types/context'

export function useAppMemo(state: AppContextState, dispatch: Dispatch<unknown>) {
  return useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
}
