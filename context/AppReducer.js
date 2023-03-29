export const initialState = {
  photoColumnCount: 0,
}

export const AppReducer = (state, { payload, type }) => {
  switch (type) {
    case 'SAVE_PHOTO_COLUMN_COUNT': {
      if (state.photoColumnCount === payload) {
        return state
      }
      return {
        ...state,
        photoColumnCount: payload,
      }
    }

    default: {
      return state
    }
  }
}
