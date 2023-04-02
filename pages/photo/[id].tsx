import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useLikedPhotoIds } from 'hooks/use-liked-photo-ids'
import { getPhoto, getPhotos, getTopics } from '@/utils/helper-filesystem'
import { getPromiseFulfilledValue } from '@/utils/helper-common'
import { toggleFavoriteStatus } from '@/utils/favorites'
import IndividualImageCard from '@/components/individual-image-card/individual-image-card'
import { Photo, PhotoId, PhotoIds, Photos } from 'types/photos'
import { SearchTopics } from 'types/search-tags'
import styles from './[id].module.scss'
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
  const {
    description,
    id: photoId,
    user: { name: authorName },
  } = photo || {}

  const titleText = (description || authorName) ?
    `. ${description ? description + '. ' : ''} ${authorName ?? ''}` :
    ''
  const likedPhotoIds = useLikedPhotoIds()
  const onClickLikeButton = (id: PhotoId) => toggleFavoriteStatus(id)

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
          isLikedPhoto={likedPhotoIds.includes(photoId)}
          likedPhotosIds={likedPhotoIds}
          onClickLikeButton={onClickLikeButton}
          photo={photo}
          photos={photos}
        />
      </div>
    </>
  )
}
