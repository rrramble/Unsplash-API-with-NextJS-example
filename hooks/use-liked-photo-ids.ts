import { useEffect, useState } from 'react'
import { PhotoIds } from 'types/photos'
import { getFavoritePhotosIds, subscribeOnChangeFavorites } from '@/utils/favorites'

export function useLikedPhotoIds() {
  const [ likedPhotoIds, setLikedPhotoIds ] = useState<PhotoIds>(getFavoritePhotosIds())
  const [ isChanged, setIsChanged ] = useState(false)
  subscribeOnChangeFavorites(() => setIsChanged(true))

  useEffect(() => { // TODO: can useEffect be removed?
    if (!isChanged) {
      return
    }
    setIsChanged(false)
    setLikedPhotoIds(getFavoritePhotosIds())
  }, [isChanged])
  return likedPhotoIds
}
