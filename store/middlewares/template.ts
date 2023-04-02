import { PayloadAction } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { reducer } from 'store/reducer'

type Reducer = ReturnType<typeof reducer>

export const template: Middleware<unknown, Reducer> =
  _store =>
    next =>
      (action: PayloadAction) => {
        return next(action)
      }
