import { useEffect, useRef } from 'react'

import styles from './hidden-input.module.scss'

export default function HiddenInput(
  isFocused: boolean,
) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    isFocused && ref?.current?.focus()
  }, [isFocused])

  return (
    <input
      aria-hidden="true"
      className={styles.self}
      readOnly={true}
      ref={ref}
      tabIndex={-1}
      type="text"
    />
  )
}
