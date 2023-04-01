import { getTopics } from '@/utils/helper-filesystem'
import styles from './404.module.scss'

export async function getStaticProps() {
  return {
    props: {
      topics: await getTopics(),
    },
  }
}

export default function Custom404Page(): JSX.Element {
  return (
    <>
      <h1
        className={styles.self}
      >
        404 - Not Found
      </h1>
    </>
  )
}
