import { Photo, PhotoId, PhotoIds, Photos } from 'types/photos'
import { getFulfilledValues } from 'utils/helper-common'

export async function downloadPhotoByUrl(url: string, filename: string): Promise<void> {
  let image: Response
  try {
    image = await fetch(url)
    if (!image.ok) {
      return
    }
  } catch(_err) {
    return
  }

  const blob = await image.blob()
  const imageURL = URL.createObjectURL(blob)
  const el = document.createElement('a')
  el.href = imageURL
  el.download = filename ?? `${url}.jpeg`
  el.style.display = 'none'
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
}

export async function fetchPhotos(photoIds: PhotoIds): Promise<Photos> {
  const promises = await Promise.
    allSettled(photoIds.map(fetchPhoto))

  return getFulfilledValues(promises)
}

export async function fetchPhoto(id: PhotoId): Promise<Photo> {
  try {
    const response = await fetch(`/api/photos/${id}`)
    if (response.ok) {
      return await response.json()
    }
    return Promise.reject()
  }
  catch (_err) {
    return Promise.reject()
  }
}
