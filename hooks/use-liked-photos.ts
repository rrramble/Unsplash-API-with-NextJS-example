import { useEffect, useState } from 'react'
import { useAppSelector } from 'hooks/store'
import { Photos } from 'types/photos'

export function useLikedPhotos() {
  const allPhotos = useAppSelector(store => store.photos)
  const likedPhotoIds = useAppSelector(store => store.favoritePhotoIds)

  const [ likedPhotos, setLikedPhotos ] = useState<Photos>([])

  useEffect(() => {
    const resultPhotos = allPhotos.filter(
        photo => likedPhotoIds.includes(photo.id)
    )
    setLikedPhotos(resultPhotos)
  }, [allPhotos, likedPhotoIds])

  return likedPhotos
}
