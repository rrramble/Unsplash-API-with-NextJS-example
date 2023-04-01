import { createReducer } from '@reduxjs/toolkit';
import { saveColumnCount } from 'store/actions';
import { FavoritePhotoEntries } from 'types/favorite-photos';

const initialState = {
  columnCount: 1,
  favoritePhotoEntries: <FavoritePhotoEntries>[],
}

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(saveColumnCount, (state, { payload }) => {
      if (state.columnCount !== payload) {
        state.columnCount = payload
      }
    })
})
