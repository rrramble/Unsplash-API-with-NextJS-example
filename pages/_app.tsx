import '@styles/globals.scss'
import { AppProps } from 'next/app'
import Layout from '@/components/layout/layout'
import { AppWrapper } from "@/context/app-context";

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
