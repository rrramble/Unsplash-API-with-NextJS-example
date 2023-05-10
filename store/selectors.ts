import { PhotoIds, Photos } from 'types/photos';
import { AppState } from 'types/state';

export function getColumnCountSelector(state: AppState): number {
  return state.columnCount;
}

export function getFavoritePhotoIdsSelector(state: AppState): PhotoIds {
  return state.favoritePhotoIds;
}

export function getPhotosSelector(state: AppState): Photos {
  return state.photos;
}
