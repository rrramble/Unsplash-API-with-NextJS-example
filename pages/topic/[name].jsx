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
  const [ photos, topics ] = await Promise.allSettled([
    getPhotos(topicSlug),
    getTopics(),
  ])

  return {
    props: {
      photos: getFulfilledValue(photos) ?? [],
      topicName: topicSlug,
      topics: getFulfilledValue(topics) ?? [],
    },
  }
}
// TODO: extract to module, or other refactoring
function getFulfilledValue({ status, value }) {
  return  status === 'fulfilled' ?
    value :
    null
}

export default function Home({ topicName, photos }) {
  const [ likedPhotosIds, setLikedPhotosIds ] = useState([])

  useEffect(() => {
    setLikedPhotosIds(getFavoritePhotosIds())
  }, [photos])

  const onClickLikeButton = (id) => {
    likedPhotosIds.includes(id) ?
      removeFavoritePhotoId(id) :
      saveFavoritePhotoId(id)
    setLikedPhotosIds(getFavoritePhotosIds())
  }

  const mainH1Header = topicName === 'default' ?
    'Случайные фотографии' :
    `Фотографии на тему: ${topicName}`

  return (
    <>
      <Head>
        <title>
          {`Фотографии с Unsplash.com. ${topicName}`}
        </title>
      </Head>
      <div className={styles.self}>
        <h1
          className="visually-hidden"
        >
          {mainH1Header}
        </h1>
        <LayoutButtons />
        <ImageCards
          photos={photos}
          likedPhotosIds={likedPhotosIds}
          onClickLikeButton={onClickLikeButton}
        />
      </div>
    </>
  )
}
