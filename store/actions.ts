import { createAction } from '@reduxjs/toolkit'
import { PhotoIds, Photos } from 'types/photos'

export const saveColumnCount = createAction<number>('columnCount/save')

export const getPhotos = createAction<PhotoIds>('photos/get')
export const setPhotos = createAction<Photos>('photos/set')
