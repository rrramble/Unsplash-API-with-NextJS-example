import { lsAddItem, lsGetArray, lsRemoveItem } from 'utils/local-storage'
import { PhotoId, PhotoIds } from 'types/photos'

export function getFavoritePhotosIds(): PhotoIds {
  return lsGetArray<PhotoId>('favoritePhotosIds')
}

export function saveFavoritePhotoId(id: PhotoId) {
  return lsAddItem('favoritePhotosIds', id)
}

export function removeFavoritePhotoId(id: PhotoId) {
  return lsRemoveItem('favoritePhotosIds', id)
}
