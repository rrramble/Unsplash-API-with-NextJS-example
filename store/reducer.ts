import { createReducer } from '@reduxjs/toolkit';
import { saveColumnCount } from 'store/actions';

const initialState = {
  columnCount: 1,
}

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(saveColumnCount, (state, { payload }) => {
      if (state.columnCount !== payload) {
        state.columnCount = payload
      }
    })
})
