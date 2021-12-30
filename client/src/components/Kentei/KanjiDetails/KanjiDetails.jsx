import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AdditionalsItem from './AdditionalsItem'
import MainItem from './MainItem'

import styles from './KanjiDetails.module.scss'

const KenteiDetails = (props) => {
  const [kanji, setKanji] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        await axios
          .get(`http://localhost:5050/kentei?kanji=${props.kanji}`)
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
    <div className={styles['kd-container']}>
      <h2>
        <span className={styles['not-kanji']}>Kanji </span>
        <span className={styles.kanji}>{props.kanji}</span>
      </h2>
      <div className={styles['kd-header']}>
        <div className={styles['kd-strokes']}>{props.kanji}</div>
        <div className={styles['kd-additionals']}>
          <AdditionalsItem item={kanji.strokes} label="strokes" />
          <AdditionalsItem item={kanji.level} label="level" />
          <AdditionalsItem item={kanji.radical} label="radicals" />
          <AdditionalsItem item={kanji.index} label="index" />
          <AdditionalsItem item={kanji.variant} label="variant" />
        </div>
      </div>
      <div className={styles['kd-main']}>
        <MainItem label="意味" content={kanji.meaning} />
        <MainItem label="音" content={kanji.onyomi} />
        <MainItem label="訓" content={kanji.kunyomi} />
      </div>
    </div>
  )
}

export default KenteiDetails
