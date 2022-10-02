import { useState } from 'react'

import styles from './layout-buttons.module.scss'
import styles_line from './layout-line-button.module.scss'
import styles_grid from './layout-grid-button.module.scss'

const options = [
  { id: 1, checked: true },
  { id: 2, checked: false },
];

function getNewState(llist, newId) {
  const newList = llist.map(item => {
    return item.id === newId ?
      { id: item.id, checked: true } :
      { id: item.id, checked: false }
    })
  return newList
}

export default function LayoutButtons() {
  const [ llist, setState ] = useState(options);
  return (
    <fieldset className={styles.self}>
      <legend className="visually-hidden">Раскладка фотографий:</legend>
      <div className={styles.item}>
        <label>
          <input
            type="radio"
            className={styles_line.self}
            name="photos-layout-buttons"
            onChange={() => setState(getNewState(llist, 1))}
            defaultChecked
          />
          <span className="visually-hidden">Горизонтально</span>
        </label>
      </div>

      <div className={styles.item}>
        <label>
          <input
            type="radio"
            className={styles_grid.self}
            name="photos-layout-buttons"
            onChange={() => setState(getNewState(llist, 2))}
          />
            <span className="visually-hidden">В квадратик</span>
        </label>
      </div>
    </fieldset>
  )
}
