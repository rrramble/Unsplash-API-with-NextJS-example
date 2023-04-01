import { Photo } from 'types/photos'

export type PhotoEntry = {
  date: Date,
  photo: Photo,
}

export type PhotoEntries = PhotoEntry[]
