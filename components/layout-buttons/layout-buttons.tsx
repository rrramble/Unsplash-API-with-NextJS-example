import { useAppSelector } from 'hooks/store'
import { getColumnCountSelector } from 'store/selectors'
import styles from './layout-buttons.module.scss'

export default function LayoutButtons(): JSX.Element {
  const photoColumnCount = useAppSelector(getColumnCountSelector)

  return (
    <fieldset className={styles.self}>
      <legend className="visually-hidden">Раскладка фотографий:</legend>
      <label className={styles.container} data-test="images-layout-button">
        <span className="visually-hidden">Одна колонка</span>
        <input
          checked={photoColumnCount <= 1}
          className={`${styles.item} ${styles['item--one-column']}`}
          disabled
          name="photos-layout-buttons"
          type="radio"
        />
      </label>

      <label className={styles.container} data-test="images-layout-button">
        <span className="visually-hidden">Несколько колонок</span>
        <input
          checked={photoColumnCount >= 2}
          className={`${styles.item} ${styles['item--multi-column']}`}
          disabled
          name="photos-layout-buttons"
          type="radio"
        />
      </label>
    </fieldset>
  )
}
