import { getPhoto, getPhotos, getTopics } from '@/utils/helper'
import { getFavoritePhotosIds, saveFavoritePhotoId, removeFavoritePhotoId } from '@/utils/local-storage'

import Head from 'next/head'
import ImageCards from '@/components/ImageCards/image-cards'
import IndividualImageCard from '@/components/IndividualImageCard/individual-image-card'
import SimilarTags from '@/components/IndividualImageCard/similar-tags'

import styles from '@/components/content.module.scss'
import { useEffect, useState } from 'react'

export async function getServerSideProps(context) {
  let { id } = context.params
  let photo
  try {
    photo = await getPhoto(id)
  } catch (e) {
    return { notFound: true }
  }

  return {
    props: {
      photo,
      photos: await getPhotos('default'),
      topics: await getTopics(),
    },
  }
}

export default function Home({ photo = [], photos = [] }) {
  const { description, user, related_collections, id: photoId } = photo
  const { name: authorName = null } = user
  const { results: realtedTags = null } = related_collections
  const titleText = (description || authorName) ?
    `. ${description ? description + '. ' : ''} ${authorName ?? ''}` :
    ''

  const [ likedPhotosIds, setLikedPhotos ] = useState([])
  const [ isLikedPhoto, setLikePhoto ] = useState(false)

  useEffect(() => {
    setLikedPhotos(getFavoritePhotosIds())
  }, [photo, photos])

  useEffect(()=> {
    const isLiked = likedPhotosIds.includes(photoId)
    setLikePhoto(isLiked)
  }, [likedPhotosIds, photoId])

  const onClickLikeButton = (id) => {
    likedPhotosIds.includes(id) ?
      removeFavoritePhotoId(id) :
      saveFavoritePhotoId(id)
    setLikedPhotos(getFavoritePhotosIds())
  }

  return (
    <>
      <Head>
        <title>
          {`Фотография с Unsplash.com${titleText}`}
        </title>
      </Head>

      <div className={styles.self}>
        <h1 className="visually-hidden">Фотография с Unsplash.com</h1>
        <IndividualImageCard
          photo={photo}
          isLiked={isLikedPhoto}
          onClickLikeButton={() => onClickLikeButton(photoId)}
        />
        <aside>
          <SimilarTags tags={realtedTags} />
          <ImageCards
            photos={photos.filter(({id}) => id !== photoId)}
            likedPhotosIds={likedPhotosIds}
            onClickLikeButton={onClickLikeButton}
            />
        </aside>
      </div>
    </>
  )
}
