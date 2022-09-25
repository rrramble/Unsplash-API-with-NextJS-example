import styles from './image'

export default function Image({
  fullPhotoUrl, regularPhotoUrl, smallPhotoUrl, photoAlt, backgroundColor
}) {
  return (
    <picture className={styles.self}>
        <source
          srcSet={fullPhotoUrl}
          media="(min-width: 960px)"
        />
        <source
          srcSet={`${fullPhotoUrl} 2x, ${regularPhotoUrl}`}
          media="(min-width: 660px)"
        />
        <source
          srcSet={`${regularPhotoUrl} 2x, ${smallPhotoUrl}`}
          media="(min-width: 320px)"
        />
        <img
          className={styles.photo}
          style={'background-color: ' + backgroundColor}
          src={smallPhotoUrl} alt={photoAlt ?? ''}
          sizes="100vw"
        />
    </picture>
  )
}
