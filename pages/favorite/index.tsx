import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getTopics } from '@/utils/helper'
import {
  getFavoritePhotosIds, toggleFavoriteStatus
} from '@/utils/favorites'
import { useDownloadingPhotos } from 'hooks/use-downloading-photos'
import ImageCards from '@/components/image-cards/image-cards'
import LayoutButtons from '@/components/layout-buttons/layout-buttons'
import styles from './index.module.scss'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function FavoriteIndex(): JSX.Element {
  const photos = useDownloadingPhotos(getFavoritePhotosIds())
  const likedPhotosIds = photos.map(photo => photo.id)

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
