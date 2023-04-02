import { createReducer } from '@reduxjs/toolkit'
import { addFavoriteId, removeFavoriteId, setColumnCount, setFavoriteIds } from 'store/actions'
import { addPhoto, setPhotos } from 'store/actions'
import { PhotoIds, Photos } from 'types/photos'

const initialState = {
  columnCount: 0,
  favoritePhotoIds: <PhotoIds>[],
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

        .addCase(setFavoriteIds, (state, { payload }) => {
          state.favoritePhotoIds = payload
        })

        .addCase(addFavoriteId, (state, { payload }) => {
          state.favoritePhotoIds.push(payload)
        })

        .addCase(removeFavoriteId, (state, { payload }) => {
          state.favoritePhotoIds = state.favoritePhotoIds.filter(
              id => id !== payload
          )
        })
    }
)
