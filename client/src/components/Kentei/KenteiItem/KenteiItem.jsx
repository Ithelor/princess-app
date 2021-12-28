import React from 'react'

import ContentController from 'controllers/KenteiItemController'

import styles from './KenteiItem.module.scss'

const KenteiItem = ({ data, className }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles['card-header']}>
        <p>
          <span>Variant: {data.variant ?? 'n/a'}</span>
          <span>Radical: {data.radical}</span>
          <span>Strokes: {data.strokes}</span>
          <span>Level: {data.level}</span>
        </p>
      </div>
      <div>
        <h2>{data.kanji}</h2>
        <hr />
      </div>
      <ContentController data={data} id={data._id} onyomi={data.onyomi} />
    </div>
  )
}

export default KenteiItem
