import { createReducer } from '@reduxjs/toolkit'
import { setColumnCount } from 'store/actions'
import { addPhoto, setPhotos } from 'store/actions'
import { Photos } from 'types/photos'

const initialState = {
  columnCount: 0,
  photos: <Photos>[],
}

export const reducer = createReducer(
    initialState,
    builder => {
      builder
        .addCase(setColumnCount, (state, { payload }) => {
          if (state.columnCount !== payload) {
            state.columnCount = payload
          }
        })
        .addCase(setPhotos, (state, { payload }) => {
          state.photos = payload
        })
        .addCase(addPhoto, (state, { payload }) => {
          // TODO: check if outtdated
          if (state.photos.some(photo => photo.id === payload.id)) {
            return
          }
          state.photos.push(payload)
        })
    }
)
