import { getTopics } from '@/utils/helper'
import { getFavoritePhotosIds, removeFavoritePhotoId, saveFavoritePhotoId } from '@/utils/local-storage'
import { useEffect, useState } from 'react'

import Head from 'next/head'
import ImageCards from '@/components/ImageCards/image-cards'
import LayoutButtons from '@/components/PhotosLayoutButtons/layout-buttons'

import styles from '@/components/content.module.scss'

export async function getServerSideProps() {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function Home() {
  const [ photos, setPhotos ] = useState([])
  const [ likedPhotosIds, setLikedPhotos ] = useState([])

  useEffect(() => {
    const likedIds = getFavoritePhotosIds('string')
    fetch('/api/favorite?ids=' + encodeURIComponent(likedIds)).
    then(res => {
      res.status === 200 && res.json().
      then(photos => setPhotos(photos))
    })
  }, [likedPhotosIds])

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
        <title>Избранные фотографии с Unsplash.com</title>
      </Head>
      <div className={styles.self}>
        <h1 className="visually-hidden">Избранные фотографии</h1>
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
