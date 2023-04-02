import { useEffect, useState } from 'react'
import { PhotoIds, Photos } from 'types/photos'

export function useLikedPhotos(photos: Photos, likedPhotosIds: PhotoIds) {
  const [ likedPhotos, setLikedPhotos ] = useState<Photos>([])

  useEffect(() => {
    const filtered = photos.filter(
        ({ id }) => likedPhotosIds.includes(id)
    )
    setLikedPhotos(filtered)
  }, [likedPhotosIds, photos])

  return likedPhotos
}
