import styles from './layout-buttons.module.scss'

export default function LayoutButtons() {
  return (
    <fieldset className={styles.self}>
      <legend className="visually-hidden">Раскладка фотографий:</legend>
        <label className={styles.item} data-test="images-layout-button">
          <input
            type="radio"
            className={styles['item--by-lines']}
            name="photos-layout-buttons"
            defaultChecked
          />
          <span className="visually-hidden">Горизонтально</span>
        </label>

      <label className={styles.item} data-test="images-layout-button">
        <input
          type="radio"
          className={styles['item--by-squares']}
          name="photos-layout-buttons"
        />
          <span className="visually-hidden">В квадратик</span>
      </label>
    </fieldset>
  )
}
