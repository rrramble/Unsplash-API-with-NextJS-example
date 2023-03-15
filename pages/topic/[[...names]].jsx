import { useEffect, useState } from 'react'

import { getPhotos, getTopics } from '@/utils/helper'
import {
  getFavoritePhotosIds, removeFavoritePhotoId, saveFavoritePhotoId
} from '@/utils/local-storage'

import Head from 'next/head'
import ImageCards from '@/components/image-cards/image-cards'
import LayoutButtons from '@/components/layout-buttons/layout-buttons'

import styles from '@/components/content.module.scss'

const DEFAULT_TOPIC_SLUG = 'default'

export async function getServerSideProps(context) {
  const { names: topicNames } = context.params
  const [ topicName = DEFAULT_TOPIC_SLUG ] = topicNames || []

  const [ photos, topics ] = await Promise.allSettled([
    getPhotos(topicName),
    getTopics(),
  ]);

  return {
    props: {
      isRootPage: !!topicNames,
      photos: getFulfilledValue(photos) ?? [],
      topicName,
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
