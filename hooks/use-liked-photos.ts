import { useEffect, useState } from 'react'
import { Photos } from 'types/photos'
import { useAppSelector } from 'hooks/store'
import { useLikedPhotoIds } from './use-liked-photo-ids'

export function useLikedPhotos() {
  const allPhotos = useAppSelector(store => store.photos)
  const likedPhotoIds = useLikedPhotoIds()
  const [ likedPhotos, setLikedPhotos ] = useState<Photos>([])

  useEffect(() => {
    const filtered = allPhotos.filter(
        ({ id }) => likedPhotoIds.includes(id)
    )
    setLikedPhotos(filtered)
  }, [likedPhotoIds, allPhotos])

  return likedPhotos
}
