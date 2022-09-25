import { useEffect, useState } from 'react'

import Icon from './icon'
import SearchInput from './search-input'
import Tags from './tags'

import styles from './search.module.scss'

export default function Search({ style, topics }) {
  const [ shouldBeFocused, setFocused ] = useState(false)
  const [ focus, setFocus ] = useState(() => {})
  const [ cancelFocus, setCancelFocus ] = useState(() => {})

  useEffect(() => {
    setFocus(() => {
      setFocused(true)
    })
    setCancelFocus(() => {
      setFocused(false)
    })
  }, [])

  return (
    <div className={style}>
      <div
        className={styles.self}
        id="search"
      >
        <Icon
          style={styles.icon}
          onClick={focus}
        />
        <div
          className={styles['search-container']}
        >
          <SearchInput
            isFocused={shouldBeFocused}
            cb={cancelFocus}
          />
          <Tags
              topics={topics}
          />
        </div>
      </div>
    </div>
  )
}
