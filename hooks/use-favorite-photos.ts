import { useEffect, useState } from 'react'

export function useFavoritePhotos(likedPhotosIds) {
  const [ photos, setPhotos ] = useState([])

  useEffect(() => {
    const idsAsString = JSON.stringify(likedPhotosIds)
    const url = `/api/favorite?ids=${encodeURIComponent(idsAsString)}`
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
