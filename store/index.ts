import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'store/reducer'
import { fetchPhotos } from './middlewares/fetch-photo'

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: null,
      }
    }).concat(fetchPhotos)
})
