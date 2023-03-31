import { PhotoId, PhotoIds } from "types/photos";
import { lsAddItem, lsGetArray, lsRemoveItem, subscribeOnChange } from "./local-storage";

type PlainCallback = () => void // FIXME: move to 'types/' folder

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

export function subscribeOnChangeFavorites(cb: PlainCallback) {
  subscribeOnChange('favoritePhotosIds', cb)
}

export function toggleFavoriteStatus(id: PhotoId) {
  const likedPhotosIds = getFavoritePhotosIds()
  likedPhotosIds.includes(id) ?
    removeFavoritePhotoId(id) :
    saveFavoritePhotoId(id)
}
