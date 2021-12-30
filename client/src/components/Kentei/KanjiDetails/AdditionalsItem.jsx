import React from 'react'

import styles from './KanjiDetails.module.scss'

const AdditionalsItem = (props) => {
  return (
    <div className={styles['kd-additional']}>
      <span className={styles['kda-item']}>{props.item ?? 'n/a'}</span>
      <span className={styles['kda-label']}>{props.label}</span>
    </div>
  )
}

export default AdditionalsItem
