import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getPhoto, getPhotos, getTopics, getPromiseFulfilledValue } from '@/utils/helper'
import {
  getFavoritePhotosIds, saveFavoritePhotoId, removeFavoritePhotoId
} from '@/utils/favorites'
import IndividualImageCard from '@/components/individual-image-card/individual-image-card'
import { Photo, Photos } from 'types/photos'
import styles from './[id].module.scss'
import { GetServerSideProps } from 'next'
import { SearchTopics } from 'types/search-tags'
import { NEXTJS_STATIC_PAGE_NOT_FOUND_OBJECT } from 'consts/consts'

type PhotoIndexProps = {
  photo: Photo,
  photos: Photos,
}

type ContextParams = {
  id: string
}

export const getServerSideProps: GetServerSideProps<PhotoIndexProps, ContextParams> = async (context) => {
  const { id } = context.params
  if (typeof id === 'object') {
    return NEXTJS_STATIC_PAGE_NOT_FOUND_OBJECT
  }

  try {
    var photo = await getPhoto(id)
  } catch (e) {
    return NEXTJS_STATIC_PAGE_NOT_FOUND_OBJECT
  }
  if (!photo) {
    return NEXTJS_STATIC_PAGE_NOT_FOUND_OBJECT
  }

  const [ photos, topics ] = await Promise.allSettled([
    getPhotos('default'),
    getTopics(),
  ])

  return {
    props: {
      photo,
      photos: getPromiseFulfilledValue<Photos>(photos),
      topics: getPromiseFulfilledValue<SearchTopics>(topics),
    },
  }
}

export default function PhotoIndex({ photo, photos = [] }: PhotoIndexProps): JSX.Element {
  const { description, user, id: photoId } = photo || {}
  const authorName = user?.name
  const titleText = (description || authorName) ?
    `. ${description ? description + '. ' : ''} ${authorName ?? ''}` :
    ''

  const [ likedPhotosIds, setLikedPhotosIds ] = useState([])
  const [ isLikedPhoto, setIsLikedPhoto ] = useState(false)

  useEffect(() => {
    setLikedPhotosIds(getFavoritePhotosIds());
  }, [])

  useEffect(() => {
    const isLiked = likedPhotosIds.includes(photoId)
    setIsLikedPhoto(isLiked)
  }, [likedPhotosIds, photoId])

  const onClickLikeButton = (id: string) => {
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
