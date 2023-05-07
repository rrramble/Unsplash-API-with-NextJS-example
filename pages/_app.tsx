import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'store/index'
import Layout from '@/components/layout/layout'
import { getFavoritePhotosIds } from '@/utils/favorites'
import { fetchPhotos } from '@/utils/helper-browser'
import { setFavoriteIds, setPhotos } from 'store/actions'

const favoritePhotoIds = getFavoritePhotosIds()
fetchPhotos(favoritePhotoIds)
  .then(photos => store.dispatch(setPhotos(photos)))
store.dispatch(setFavoriteIds(favoritePhotoIds))

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout topics={pageProps.topics} >
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
