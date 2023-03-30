import '@styles/globals.scss'
import { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { AppWrapper } from "@/context/AppContext";

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