import { appReducer, initialState } from '@/context/app-reducer'
import { useAppMemo } from '../context/index'

export type AppContextState = typeof initialState
export type AppContextObject = ReturnType<typeof useAppMemo>
export type AppReducer = typeof appReducer
