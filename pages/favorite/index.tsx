import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getTopics } from '@/utils/helper-filesystem'
import {
  getFavoritePhotosIds, subscribeOnChangeFavorites, toggleFavoriteStatus
} from '@/utils/favorites'
import ImageCards from '@/components/image-cards/image-cards'
import LayoutButtons from '@/components/layout-buttons/layout-buttons'
import { PhotoIds } from 'types/photos'
import styles from './index.module.scss'
import { useLikedPhotos } from 'hooks/use-liked-photos'
import { useAppSelector } from 'hooks/store'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function FavoriteIndex(): JSX.Element {
  const photos = useAppSelector(store => store.photos)
  const [ likedPhotosIds, setLikedPhotosIds ] =
    useState<PhotoIds>(getFavoritePhotosIds())

  const likedPhotos = useLikedPhotos(photos, likedPhotosIds)

  subscribeOnChangeFavorites(
      () => setLikedPhotosIds(getFavoritePhotosIds())
  )

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
            photos={likedPhotos}
            likedPhotosIds={likedPhotosIds}
            onClickLikeButton={(id) => toggleFavoriteStatus(id)}
          />
        </section>
      </div>
    </>
  )
}

