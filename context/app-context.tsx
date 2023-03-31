import { createContext, useContext, useMemo, useReducer } from 'react'
import { AppContextObject } from 'types/context'
import { appReducer, initialState } from './app-reducer'

const AppContext = createContext<AppContextObject>(null)

export function AppWrapper({ children }) {
  const [ state, dispatch ] = useReducer(appReducer, initialState)

  const contextValue = useMemo(
      () => ({ state, dispatch }),
      [state, dispatch]
  )

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext)
}

