import '@styles/globals.scss'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'store/index'
import Layout from '@/components/layout/layout'

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
