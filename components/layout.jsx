import Head from 'next/head'

import Footer from './footer'
import Header from './header'

import styles from './layout.module.scss'

export default function Layout({ children, topics }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header
        className={styles.header}
      >
        <Header topics={topics} />
      </header>
      <main>{children}</main>
      <footer><Footer /></footer>
    </>
  )
}
