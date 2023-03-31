import { createAction } from '@reduxjs/toolkit'

export const saveColumnCount = createAction<number>('columnCount/save')
