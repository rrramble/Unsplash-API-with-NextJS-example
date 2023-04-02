import { useEffect, useState } from 'react'
import { PhotoIds, Photos } from 'types/photos'
import { useAppSelector } from 'hooks/store'
import { getFavoritePhotosIds, subscribeOnChangeFavorites } from '@/utils/favorites'

export function useLikedPhotos() {
  const allPhotos = useAppSelector(store => store.photos)
  const [ likedPhotos, setLikedPhotos ] = useState<Photos>([])
  const [ likedPhotoIds, setLikedPhotoIds ] = useState<PhotoIds>(getFavoritePhotosIds())

  subscribeOnChangeFavorites(() => setLikedPhotoIds(getFavoritePhotosIds()))

  useEffect(() => {
    const filtered = allPhotos.filter(
        ({ id }) => likedPhotoIds.includes(id)
    )
    setLikedPhotos(filtered)
  }, [likedPhotoIds, allPhotos])

  return likedPhotos
}
