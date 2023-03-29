import { useEffect, useState } from 'react'
import { getFavoritePhotosIds } from '@/utils/local-storage'

export function useFavoritePhotos(likedPhotosIds) {
  const [ photos, setPhotos ] = useState([])

  useEffect(() => {
    const likedIds = getFavoritePhotosIds('string')
    const url = `/api/favorite?ids=${encodeURIComponent(likedIds)}`
    fetch(url).
      then(res => res.status === 200 && res.json()).
      then(photos => {
        const foundPhotoPromises = photos.filter(
            ({ status, value }) => status === 'fulfilled' && value !== null
        )
        const foundPhotos = foundPhotoPromises.map(
            ({ value }) => value
        )
        setPhotos(foundPhotos)
      })
  }, [likedPhotosIds])

  return photos
}
