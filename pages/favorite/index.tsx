import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { getTopics } from '@/utils/helper'
import {
  getFavoritePhotosIds, subscribeOnChangeFavorites, toggleFavoriteStatus
} from '@/utils/favorites'
import { useDownloadingPhotos } from 'hooks/use-downloading-photos'
import ImageCards from '@/components/image-cards/image-cards'
import LayoutButtons from '@/components/layout-buttons/layout-buttons'
import styles from './index.module.scss'
import { PhotoIds } from 'types/photos'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function FavoriteIndex(): JSX.Element {
  const [ likedPhotosIds, setLikedPhotosIds ] = useState<PhotoIds>([])
  const [ shouldUpdate, setShouldUpdate ] = useState(true)
  const photos = useDownloadingPhotos(likedPhotosIds)
  subscribeOnChangeFavorites(() => setShouldUpdate(true))

  useEffect(() => {
    if (shouldUpdate === false) {
      return
    }
    setShouldUpdate(false)
    setLikedPhotosIds(getFavoritePhotosIds())
  }, [shouldUpdate])

  return (
    <>
      <Head>
        <title>Избранные фотографии с Unsplash.com</title>
      </Head>
      <div className={styles.self}>
        <h1 className={styles.header}>Избранное</h1>
        <section
          className={styles.content}
        >
          <LayoutButtons />
          <ImageCards
            photos={photos}
            likedPhotosIds={likedPhotosIds}
            onClickLikeButton={(id) => toggleFavoriteStatus(id)}
          />
        </section>
      </div>
    </>
  )
}
