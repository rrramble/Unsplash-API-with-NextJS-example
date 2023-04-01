import { useEffect, useState } from 'react'
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
import { useAppDispatch, useAppSelector } from 'hooks/store'
import { getPhotos } from 'store/actions'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function FavoriteIndex(): JSX.Element {
  const photos = useAppSelector(store => store.photos)
  const dispatch = useAppDispatch()
  const [ likedPhotosIds, setLikedPhotosIds ] =
    useState<PhotoIds>(getFavoritePhotosIds())
  subscribeOnChangeFavorites(() => setLikedPhotosIds(getFavoritePhotosIds()))
  useEffect(() => {
    dispatch(getPhotos(likedPhotosIds))
  }, [dispatch, likedPhotosIds])

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
