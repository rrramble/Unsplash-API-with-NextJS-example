import { useEffect, useState } from 'react'
import { useAppSelector } from 'hooks/store'
import { getFavoritePhotoIdsSelector } from 'store/selectors'
import { PhotoIds } from 'types/photos'

export function useLikedPhotosIds() {
  const likedPhotoIds = useAppSelector(getFavoritePhotoIdsSelector)
  const [ resultIds, setResultIds ] = useState<PhotoIds>([])

  useEffect(() => {
    setResultIds(likedPhotoIds)
  }, [ likedPhotoIds ])

  return resultIds
}
