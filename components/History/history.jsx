import { useEffect, useState } from 'react'
import { getSearchedTexts } from '@/utils/local-storage'

import Icon from './icon'
import Tags from './tags'
import styles from './history.module.scss'

export default function History({ style }) {
  const [ likedPhotos, setLikedPhotos ] = useState([])
  useEffect(() => {
    setLikedPhotos(getSearchedTexts())
  }, [])

  return (
    <div className={style}>
      <div className={styles.self}>
        <Icon
          style={styles.icon}
        />
        <div
          className={styles['list-container']}
        >
          <header
            className={styles.header}
          >
            Ваши запросы
          </header>
          <Tags
            items={likedPhotos}
            style={styles.tags}
          />
        </div>
      </div>
    </div>
  )
}
