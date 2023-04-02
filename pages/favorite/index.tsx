import { GetStaticProps } from 'next'
import Head from 'next/head'
import { toggleOneFavoriteId } from 'store/actions'
import { useLikedPhotos } from 'hooks/use-liked-photos'
import { useAppDispatch } from 'hooks/store'
import { getTopics } from '@/utils/helper-filesystem'
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
  const likedPhotos = useLikedPhotos()
  const dispatch = useAppDispatch()

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
            photos={likedPhotos}
            likedPhotosIds={likedPhotos.map(photo => photo.id)}
            onClickLikeButton={(id: PhotoId) => dispatch(toggleOneFavoriteId(id))}
          />
        </section>
      </div>
    </>
  )
}

