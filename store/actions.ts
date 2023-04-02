import { createAction } from '@reduxjs/toolkit'
import { Photo, PhotoId, PhotoIds, Photos } from 'types/photos'

export const setColumnCount = createAction<number>('columnCount/set')

export const addPhoto = createAction<Photo>('photos/addOne')
export const setPhotos = createAction<Photos>('photos/set')

export const setFavoriteIds = createAction<PhotoIds>('favorites/set')
export const toggleOneFavoriteId = createAction<PhotoId>('favorites/toggleOne')
