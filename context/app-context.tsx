import { createContext, useContext, useMemo, useReducer } from 'react'
import { appReducer, initialState } from './app-reducer'
import { AppContextObject } from 'types/context'

const AppContext = createContext<AppContextObject>(null)

export function AppWrapper({ children }) {
  const [ state, dispatch ] = useReducer(appReducer, initialState)

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext)
}

