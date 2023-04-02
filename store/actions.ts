import { createAction } from '@reduxjs/toolkit'
import { Photo, Photos } from 'types/photos'

export const setColumnCount = createAction<number>('columnCount/set')

export const addPhoto = createAction<Photo>('photos/addOne')
export const setPhotos = createAction<Photos>('photos/set')
