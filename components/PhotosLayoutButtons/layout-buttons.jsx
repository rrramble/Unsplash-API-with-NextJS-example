import styles from './layout-buttons.module.scss'
import styles_line from './layout-line-button.module.scss'
import styles_grid from './layout-grid-button.module.scss'

export default function LayoutButtons() {
  return (
    <fieldset className={styles.self}>
      <legend className="visually-hidden">Раскладка фотографий:</legend>
      <div className={styles.item} data-test="images-layout-button">
        <label>
          <input
            type="radio"
            className={styles_line.self}
            name="photos-layout-buttons"
            defaultChecked
          />
          <span className="visually-hidden">Горизонтально</span>
        </label>
      </div>

      <div className={styles.item} data-test="images-layout-button">
        <label>
          <input
            type="radio"
            className={styles_grid.self}
            name="photos-layout-buttons"
          />
            <span className="visually-hidden">В квадратик</span>
        </label>
      </div>
    </fieldset>
  )
}
