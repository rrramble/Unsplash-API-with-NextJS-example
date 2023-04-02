import { store } from 'store'
import { addPhoto } from 'store/actions'
import { lsAddItem, lsGetArray, lsRemoveItem, subscribeOnChange } from 'utils/local-storage'
import { fetchPhoto } from 'utils/helper-browser'
import { PhotoId, PhotoIds } from 'types/photos'
import { PlainFunction } from 'types/types'

export function getFavoritePhotosIds(): PhotoIds {
  return lsGetArray<PhotoId>('favoritePhotosIds')
}

export function isPhotoIdLiked(id: PhotoId) {
  return getFavoritePhotosIds().includes(id)
}

export function saveFavoritePhotoId(id: PhotoId) {
  return lsAddItem('favoritePhotosIds', id)
}

export function removeFavoritePhotoId(id: PhotoId) {
  return lsRemoveItem('favoritePhotosIds', id, id => id)
}

export function subscribeOnChangeFavorites(cb: PlainFunction) {
  subscribeOnChange('favoritePhotosIds', cb)
}

export function toggleFavoriteStatus(id: PhotoId) {
  const likedPhotosIds = getFavoritePhotosIds()
  if (likedPhotosIds.includes(id)) {
    removeFavoritePhotoId(id)
  } else {
    saveFavoritePhotoId(id)
    fetchPhoto(id)
      .then((photo) => {
        const action = addPhoto(photo)
        store.dispatch(action)
      })
      .catch()
  }
}
