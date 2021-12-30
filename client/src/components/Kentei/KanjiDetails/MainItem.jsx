import React from 'react'
import { BsPencilFill as PenIcon } from 'react-icons/bs'

import styles from './KanjiDetails.module.scss'

const MainItem = (props) => {
  return (
    <div className={styles['kd-row']}>
      <span className={styles.label}>{props.label}</span>
      <span className={styles.content}>{props.content}</span>
      <span className={styles.icon}>
        <PenIcon />
      </span>
    </div>
  )
}

export default MainItem
