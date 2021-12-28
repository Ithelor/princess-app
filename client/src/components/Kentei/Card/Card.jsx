import React from 'react'

import ContentController from 'components/Kentei/Card/CardController'

import styles from './Card.module.scss'

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
      <ContentController data={data} />
    </div>
  )
}

export default KenteiItem
