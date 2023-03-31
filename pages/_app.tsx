import '@styles/globals.scss'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'store/index'
import { AppWrapper } from "@/context/app-context";
import Layout from '@/components/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Layout topics={pageProps.topics} >
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </Provider>
  )
}

export default MyApp
