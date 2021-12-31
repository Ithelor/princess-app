import React from 'react'

import styles from './ToggleSwitch.module.scss'

const ToggleSwitch = (props) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onClick={props.onClick} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  )
}

export default ToggleSwitch
