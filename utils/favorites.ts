import { store } from 'store'
import { addPhoto } from 'store/actions'
import { lsAddItem, lsGetArray, lsRemoveItem, subscribeOnChange } from 'utils/local-storage'
import { fetchPhoto } from 'utils/helper-browser'
import { PhotoId, PhotoIds } from 'types/photos'
import { PlainFunction } from 'types/types'

export function getFavoritePhotosIds(): PhotoIds {
  return lsGetArray<PhotoId>('favoritePhotosIds')
}

export function saveFavoritePhotoId(id: PhotoId) {
  return lsAddItem('favoritePhotosIds', id)
}

export function removeFavoritePhotoId(id: PhotoId) {
  return lsRemoveItem('favoritePhotosIds', id, id => id)
}
