import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import { BsPencilFill as PenIcon } from 'react-icons/bs'

import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch'

import styles from './KanjiDetails.module.scss'
import 'styles/partials/_anim.scss'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const KenteiDetails = (props) => {
  // current data
  const [kanji, setKanji] = useState('')

  // kanji display mode
  const [strokesActive, setStrokesActive] = useState(false)

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
        <div className={styles['kanji-container']}>
          <CSSTransition
            in={strokesActive === false}
            timeout={300}
            classNames="menu-primary">
            <div className={styles['kanji-normal']}>{props.kanji}</div>
          </CSSTransition>
          <CSSTransition
            in={strokesActive === true}
            timeout={300}
            classNames="menu-secondary">
            <div className={styles['kanji-strokes']}>{props.kanji}</div>
          </CSSTransition>

          <ToggleSwitch onClick={() => setStrokesActive(!strokesActive)} />
        </div>
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
