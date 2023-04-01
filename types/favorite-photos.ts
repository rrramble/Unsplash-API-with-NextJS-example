import { Photo } from 'types/photos'

export type FavoritePhotoEntry = {
  date: Date,
  photo: Photo,
}

export type FavoritePhotoEntries = FavoritePhotoEntry[]
