import styles from './layout-buttons.module.scss'
import { useAppContext } from '@/context/AppContext'

export default function LayoutButtons() {
  const { state: { photoColumnCount } } = useAppContext()

  return (
    <fieldset className={styles.self}>
      <legend className="visually-hidden">Раскладка фотографий:</legend>
      <label className={styles.item} data-test="images-layout-button">
        <input
          checked={photoColumnCount <= 1}
          className={styles['item--by-lines']}
          defaultChecked
          disabled
          name="photos-layout-buttons"
          type="radio"
        />
        <span className="visually-hidden">Горизонтально</span>
      </label>

    <label className={styles.item} data-test="images-layout-button">
      <input
        checked={photoColumnCount >= 2}
        className={styles['item--by-squares']}
        disabled
        name="photos-layout-buttons"
        type="radio"
      />
        <span className="visually-hidden">В квадратик</span>
    </label>
    </fieldset>
  )
}
