import { createReducer } from '@reduxjs/toolkit'
import { saveColumnCount, setPhotos } from 'store/actions'
import { Photos } from 'types/photos';

const initialState = {
  columnCount: 0,
  photos: <Photos>[],
}

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(saveColumnCount, (state, { payload }) => {
      if (state.columnCount !== payload) {
        state.columnCount = payload
      }
    })
    .addCase(setPhotos, (state, { payload }) => {
      state.photos = payload
    })
})
