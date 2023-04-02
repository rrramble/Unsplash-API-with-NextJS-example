import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'store/reducer'
import { template } from './middlewares/template'

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: null,
      }
    }).concat(template)
})
