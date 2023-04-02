import { createAsyncThunk } from '@reduxjs/toolkit'
import { addFavoriteId, addPhoto, removeFavoriteId } from 'store/actions'
import { fetchPhoto } from '@/utils/helper-browser'
import { AppDispatch, AppState } from 'types/state'
import { PhotoId } from 'types/photos'
import { saveFavoritePhotoId } from '@/utils/favorites'
import { removeFavoritePhotoId } from '@/utils/favorites'

export const clickLikeAction = createAsyncThunk<void, PhotoId, {
  dispatch: AppDispatch,
  state: AppState,
}>(
    'photos/clickLike',
    async (photoId, { dispatch, getState }) => {
      const { favoritePhotoIds, photos } = getState()

      if (favoritePhotoIds.includes(photoId)) {
        dispatch(removeFavoriteId(photoId))
        removeFavoritePhotoId(photoId)
        return
      }

      dispatch(addFavoriteId(photoId))
      saveFavoritePhotoId(photoId)
      const isPhotoInfoLoaded = photos.some(photo => photo.id === photoId)
      if (!isPhotoInfoLoaded) {
        const photo = await fetchPhoto(photoId)
        photo && dispatch(addPhoto(photo))
      }
    },
)
