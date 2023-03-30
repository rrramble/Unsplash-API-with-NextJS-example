import { AppContextState } from 'types/context'

export const initialState = {
  // TODO: add favoritePhotosIds
  photoColumnCount: 0,
}

export function AppReducer(state: AppContextState, { payload, type }): AppContextState {
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
