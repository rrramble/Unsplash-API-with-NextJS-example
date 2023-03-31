import { useEffect, useState } from 'react'
import { PhotoIds } from 'types/photos'

export function useDownloadingPhotos(photosIds: PhotoIds) {
  const [ photos, setPhotos ] = useState([])

  useEffect(() => {
    const idsAsString = JSON.stringify(photosIds)
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
  }, [photosIds])

  return photos
}
