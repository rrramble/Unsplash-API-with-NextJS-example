import { useEffect, useState } from 'react'
import { useAppSelector } from 'hooks/store'
import { getFavoritePhotoIdsSelector, getPhotosSelector } from 'store/selectors'
import { Photos } from 'types/photos'

export function useLikedPhotos() {
  const allPhotos = useAppSelector(getPhotosSelector)
  const likedPhotoIds = useAppSelector(getFavoritePhotoIdsSelector)
  const [ likedPhotos, setLikedPhotos ] = useState<Photos>([])

  useEffect(() => {
    const resultPhotos = allPhotos.filter(
        photo => likedPhotoIds.includes(photo.id)
    )
    setLikedPhotos(resultPhotos)
  }, [ allPhotos, likedPhotoIds ])

  return likedPhotos
}
