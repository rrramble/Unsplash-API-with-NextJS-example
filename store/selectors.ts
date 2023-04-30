import { PhotoIds } from 'types/photos';
import { AppState } from 'types/state';

export function getFavoritePhotoIdsSelector(state: AppState): PhotoIds {
  return state.favoritePhotoIds;
}
