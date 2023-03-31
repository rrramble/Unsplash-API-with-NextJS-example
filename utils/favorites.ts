import { PhotoId, PhotoIds } from 'types/photos';
import { PlainFunction } from 'types/types'
import { lsAddItem, lsGetArray, lsRemoveItem, subscribeOnChange } from './local-storage';

export function getFavoritePhotosIds(): PhotoIds {
  return lsGetArray('favoritePhotosIds')
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
  likedPhotosIds.includes(id) ?
    removeFavoritePhotoId(id) :
    saveFavoritePhotoId(id)
}
