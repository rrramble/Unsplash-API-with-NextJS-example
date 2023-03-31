import '@styles/globals.scss'
import { AppProps } from 'next/app'
import { AppWrapper } from "@/context/app-context";
import Layout from '@/components/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Layout topics={pageProps.topics} >
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )
}

export default MyApp
