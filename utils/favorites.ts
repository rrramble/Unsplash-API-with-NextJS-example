import { PhotoId } from "types/photos";
import { lsAddItem, lsGetArray, lsRemoveItem, subscribeOnChange } from "./local-storage";

type PlainCallback = () => void // FIXME: move to 'types/' folder

export function getFavoritePhotosIds(): string[] {
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
