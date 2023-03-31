import { useEffect, useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getTopics } from '@/utils/helper'
import {
  getFavoritePhotosIds, removeFavoritePhotoId, saveFavoritePhotoId, subscribeOnChangeFavorites
} from '@/utils/favorites'
import { useDownloadingPhotos } from 'hooks/use-downloading-photos'
import ImageCards from '@/components/image-cards/image-cards'
import LayoutButtons from '@/components/layout-buttons/layout-buttons'
import styles from './index.module.scss'
import { PhotoId } from 'types/photos'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function FavoriteIndex(): JSX.Element {
  const [ likedPhotosIds, setLikedPhotosIds ] = useState([])
  const photos = useDownloadingPhotos(likedPhotosIds)

  subscribeOnChangeFavorites(() => setLikedPhotosIds(getFavoritePhotosIds()))

  useEffect(() => {
    setLikedPhotosIds(getFavoritePhotosIds())
  }, [])

  const onClickLikeButton = (id: PhotoId) => likedPhotosIds.includes(id) ?
    removeFavoritePhotoId(id) :
    saveFavoritePhotoId(id)

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
            onClickLikeButton={onClickLikeButton}
          />
        </section>
      </div>
    </>
  )
}
