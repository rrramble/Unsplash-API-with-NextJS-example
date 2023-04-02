import { useAppSelector } from 'hooks/store'

export function useLikedPhotos() {
  const allPhotos = useAppSelector(store => store.photos)
  const likedPhotoIds = useAppSelector(store => store.favoritePhotoIds)

  return allPhotos.filter(
      photo => likedPhotoIds.includes(photo.id)
  )
}
