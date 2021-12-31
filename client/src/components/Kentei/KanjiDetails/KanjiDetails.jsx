import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsPencilFill as PenIcon } from 'react-icons/bs'

import styles from './KanjiDetails.module.scss'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const KenteiDetails = (props) => {
  const [kanji, setKanji] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        await axios
          .get(`${SERVER_URL}/kentei?kanji=${props.kanji}`)
          .then((res) => {
            setKanji(res.data)
            console.log(res.data)
          })
        // setLoading(true)
      } catch (err) {
        console.log(err)
      }
    })()
  }, []) /* fuck off */ // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles['container']}>
      <h2>
        <span>Kanji </span>
        <span>{props.kanji}</span>
      </h2>
      <div className={styles['kd-main']}>
        <div className={styles['kdm-strokes']}>{props.kanji}</div>
        <div className={styles['kdm-stats']}>
          <StatsItem item={kanji.strokes} label="strokes" />
          <StatsItem item={kanji.level} label="level" />
          <StatsItem item={kanji.radical} label="radicals" />
          <StatsItem item={kanji.index} label="index" />
          <StatsItem item={kanji.variant} label="variant" />
        </div>
      </div>
      <div className={styles['kd-adds']}>
        <AddsItem label="意味" content={kanji.meaning} />
        <AddsItem label="音" content={kanji.onyomi} />
        <AddsItem label="訓" content={kanji.kunyomi} />
      </div>
    </div>
  )
}

const StatsItem = (props) => {
  return (
    <div className={styles['stats-item']}>
      <span className={styles['item-value']}>{props.item ?? 'n/a'}</span>
      <span className={styles['item-label']}>{props.label}</span>
    </div>
  )
}

const AddsItem = (props) => {
  return (
    <div className={styles['adds-item']}>
      <span className={styles['item-label']}>{props.label}</span>
      <span className={styles['item-content']}>{props.content}</span>
      <span className={styles['item-icon']}>
        <PenIcon />
      </span>
    </div>
  )
}

export default KenteiDetails
