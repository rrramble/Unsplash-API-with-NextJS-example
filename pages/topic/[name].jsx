import { useEffect, useState } from 'react'

import { getPhotos, getTopics } from '@/utils/helper'
import {
  getFavoritePhotosIds, removeFavoritePhotoId, saveFavoritePhotoId
} from '@/utils/local-storage'

import Head from 'next/head'
import ImageCards from '@/components/ImageCards/image-cards'
import LayoutButtons from '@/components/PhotosLayoutButtons/layout-buttons'

import styles from '@/components/content.module.scss'

export async function getServerSideProps(context) {
  const { name: topicSlug } = context.params
  return {
    props: {
      photos: await getPhotos(topicSlug),
      topicName: topicSlug,
      topics: await getTopics(),
    },
  }
}

export default function Home({ topicName, photos }) {
  const [ likedPhotosIds, setLikedPhotos ] = useState([])

  useEffect(() => {
    setLikedPhotos(getFavoritePhotosIds())
  }, [photos])

  const onClickLikeButton = (id) => {
    likedPhotosIds.includes(id) ?
      removeFavoritePhotoId(id) :
      saveFavoritePhotoId(id)
    setLikedPhotos(getFavoritePhotosIds())
  }

  return (
    <>
      <Head>
        <title>{`Фотографии с Unsplash.com. {topicName}`}</title>
      </Head>
      <div className={styles.self}>
        <h1 className="visually-hidden">Тема: {topicName}</h1>
        <LayoutButtons />
        <form id="images" method="POST" action="/">
          <ImageCards
            photos={photos}
            likedPhotosIds={likedPhotosIds}
            onClickLikeButton={onClickLikeButton}
          />
        </form>
      </div>
    </>
  )
}
