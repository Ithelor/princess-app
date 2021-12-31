import React from 'react'

import styles from './Card.module.scss'

const CardController = require('./CardController.jsx')

const KenteiItem = ({ data, className }) => {
  const CC = new CardController(data)

  return (
    <div className={`${styles.card} ${className}`}>
      <div>
        <h2>{data.kanji}</h2>
        <hr />
      </div>
      <div className={styles['sub-content']}>
        <div className={styles.row}>
          <span className={`${styles.label} ${styles.generic}`}>音読み</span>
          <div className={styles.readings}>
            {CC.handleReadings(data._id, data.onyomi, 'on')}
          </div>
        </div>
        <div className={styles.row}>
          <span className={`${styles.label} ${styles.generic}`}>訓読み</span>
          <div className={styles.readings}>
            {CC.handleReadings(data._id, data.kunyomi, 'kun')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KenteiItem
