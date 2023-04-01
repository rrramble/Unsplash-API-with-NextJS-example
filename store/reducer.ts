import { createReducer } from '@reduxjs/toolkit';
import { saveColumnCount } from 'store/actions';
import { PhotoEntries } from 'types/photo-entries';

const initialState = {
  columnCount: 1,
  photoEntries: <PhotoEntries>[],
}

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(saveColumnCount, (state, { payload }) => {
      if (state.columnCount !== payload) {
        state.columnCount = payload
      }
    })
})
