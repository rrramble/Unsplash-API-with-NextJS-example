import { ReactNode } from 'react'
import Head from 'next/head'
import Footer from './footer'
import Header from './header'
import { SearchTopics } from 'types/search-tags'
import styles from './layout.module.scss'

type LayoutProps = {
  children: ReactNode,
  isRootPage?: boolean,
  topics: SearchTopics,
}

export default function Layout({ children, isRootPage, topics }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Training project using API of the 'Unsplash.com' portal." />
        <link rel="preload" href="/fonts/sf-ui-display-medium-58646be638f96.woff" as="font" crossOrigin="" />
      </Head>
      <header
        className={styles.header}
      >
        <Header topics={topics} isRootPage={isRootPage} />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer onClick={() => window.scrollTo(0, 0)} />
      </footer>
    </>
  )
}
