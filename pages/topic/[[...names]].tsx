import { useEffect, useState } from 'react'
import { getPhotos, getTopics } from '@/utils/helper'
import {
  getFavoritePhotosIds, subscribeOnChangeFavorites, toggleFavoriteStatus
} from '@/utils/favorites'
import Head from 'next/head'
import ImageCards from '@/components/image-cards/image-cards'
import LayoutButtons from '@/components/layout-buttons/layout-buttons'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getPromiseFulfilledValue } from 'utils/helper'
import { Photos } from 'types/photos'
import { SearchTopics } from 'types/search-tags'
import styles from './[[...names]].module.scss'

const DEFAULT_TOPIC_SLUG = 'default'

type TopicIndexProps = {
  photos: Photos,
  topicName: string,
}

type ContextParams = {
  names: string[] | undefined
}

export const getServerSideProps: GetServerSideProps<TopicIndexProps, ContextParams> = async (context: GetServerSidePropsContext) => {
  const { names: topicNames } = context.params
  const [ topicName = DEFAULT_TOPIC_SLUG ] = topicNames && typeof topicNames !== 'string' ?
    topicNames :
    []

  const [ photos, topics ] = await Promise.allSettled([
    getPhotos(topicName),
    getTopics(),
  ]);

  return {
    props: {
      photos: getPromiseFulfilledValue<Photos>(photos) ?? [],
      topicName,
      topics: getPromiseFulfilledValue<SearchTopics>(topics) ?? [],
    },
  }
}

export default function TopicIndex({ topicName, photos }: TopicIndexProps) {
  const [ likedPhotosIds, setLikedPhotosIds ] = useState([])
  subscribeOnChangeFavorites(() => setLikedPhotosIds(getFavoritePhotosIds()))

  useEffect(() => {
    setLikedPhotosIds(getFavoritePhotosIds())
  }, [photos])

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
          onClickLikeButton={(id) => toggleFavoriteStatus(id)}
        />
      </div>
    </>
  )
}
