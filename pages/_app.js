import '../styles/globals.scss'

import Layout from '../components/layout'
import { AppWrapper } from "@/context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout topics={pageProps.topics} >
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )
}

export default MyApp
