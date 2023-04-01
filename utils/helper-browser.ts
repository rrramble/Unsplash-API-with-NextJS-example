import { Photo, PhotoId, PhotoIds, Photos } from 'types/photos'
import { getPromiseFulfilledValue } from './helper-common'

export async function downloadPhotoByUrl(url: string, filename: string): Promise<void> {
  let image: Response
  try {
    image = await fetch(url);
    if (!image.ok) {
      return
    }
  } catch(e) {
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
  const photos = promises.map(getPromiseFulfilledValue)
  return photos
}

export async function fetchPhoto(id: PhotoId): Promise<Photo> {
  const response = await fetchPhotoInfo(id)
  if (response.ok) {
    return response.json()
  }
  return Promise.reject()
}

export async function fetchPhotoInfo(id: PhotoId) {
  return await fetch(`/api/favorite?${id}`)
}
