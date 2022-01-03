import React from 'react'
import classNames from 'classnames'

import CardController from './KenteiCardController'

import styles from './KenteiCard.module.scss'

const KenteiItem = ({ data }) => {
  const CC = new CardController()

  return (
    <div className={styles.container}>
      <h2>{data.kanji}</h2>
      <hr />
      <div className={styles.details}>
        <div className={styles.row}>
          <span className={classNames(styles.label, styles._generic)}>音読み</span>
          <div className={styles.readings}>
            {CC.handleReadings(data._id, data.onyomi, '_on')}
          </div>
        </div>
        <div className={styles.row}>
          <span className={classNames(styles.label, styles._generic)}>訓読み</span>
          <div className={styles.readings}>
            {CC.handleReadings(data._id, data.kunyomi, '_kun')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KenteiItem
