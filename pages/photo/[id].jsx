import { getPhoto, getPhotos, getTopics } from '@/utils/helper'
import { getFavoritePhotosIds, saveFavoritePhotoId, removeFavoritePhotoId } from '@/utils/local-storage'

import Head from 'next/head'

import IndividualImageCard from '@/components/IndividualImageCard/individual-image-card'
import styles from './[id].module.scss'

import { useEffect, useState } from 'react'

export async function getServerSideProps(context) {
  let { id } = context.params
  let photo
  try {
    photo = await getPhoto(id)
  } catch (e) {
    return { notFound: true }
  }

  const [ photos, topics ] = await Promise.allSettled([
    getPhotos('default'),
    getTopics(),
  ])

  return {
    props: {
      photo,
      photos: getFulfilledValue(photos),
      topics: getFulfilledValue(topics),
    },
  }
}

function getFulfilledValue({ status, value }) {
  return  status === 'fulfilled' ?
    value :
    null
}

export default function Home({ photo, photos = [] }) {
  const { description, user, id: photoId } = photo || {}
  const authorName = user?.name
  const titleText = (description || authorName) ?
    `. ${description ? description + '. ' : ''} ${authorName ?? ''}` :
    ''

  const [ likedPhotosIds, setLikedPhotosIds ] = useState([])
  const [ isLikedPhoto, setIsLikedPhoto ] = useState(false)

  useEffect(() => {
    const isLiked = likedPhotosIds.includes(photoId)
    setIsLikedPhoto(isLiked)
  }, [likedPhotosIds, photoId])

  const onClickLikeButton = (id) => {
    likedPhotosIds.includes(id) ?
      removeFavoritePhotoId(id) :
      saveFavoritePhotoId(id)
    setLikedPhotosIds(getFavoritePhotosIds())
  }

  return(
    <>
      <Head>
        <title>
          {`Фотография с Unsplash.com${titleText}`}
        </title>
      </Head>

      <h1 className="visually-hidden">Фотография с Unsplash.com</h1>
      <div className={styles.self}>
        <IndividualImageCard
          isLikedPhoto={isLikedPhoto}
          likedPhotosIds={likedPhotosIds}
          onClickLikeButton={onClickLikeButton}
          photo={photo}
          photos={photos}
        />
      </div>
    </>
  )
}
