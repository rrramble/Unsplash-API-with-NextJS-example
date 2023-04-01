import { PayloadAction } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { reducer } from '../reducer'
import { getPhotos, setPhotos } from 'store/actions'
import { PhotoIds } from 'types/photos'
import { fetchPhotos as fetchPhotosFromServer} from '@/utils/helper-browser'

type Reducer = ReturnType<typeof reducer>

export const fetchPhotos: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<PhotoIds>) => {

        if (action.type === getPhotos.toString()) {
          fetchPhotosFromServer(action.payload)
            .then(photos => {
              _store.dispatch(setPhotos(photos))
            })
            .catch()
        }

        return next(action)
      }
