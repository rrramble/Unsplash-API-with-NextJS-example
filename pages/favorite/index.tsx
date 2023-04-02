import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getTopics } from '@/utils/helper-filesystem'
import { toggleFavoriteStatus } from '@/utils/favorites'
import ImageCards from '@/components/image-cards/image-cards'
import LayoutButtons from '@/components/layout-buttons/layout-buttons'
import styles from './index.module.scss'
import { useLikedPhotos } from 'hooks/use-liked-photos'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function FavoriteIndex(): JSX.Element {
  const likedPhotos = useLikedPhotos()

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
            onClickLikeButton={(id) => toggleFavoriteStatus(id)}
          />
        </section>
      </div>
    </>
  )
}

