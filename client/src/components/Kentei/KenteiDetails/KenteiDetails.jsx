import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import { BsPencilFill as PenIcon } from 'react-icons/bs'

import styles from './KenteiDetails.module.scss'
import 'styles/index.scss'
import 'styles/partials/_anim.scss'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const KenteiDetails = (props) => {
  // current data
  const [kanji, setKanji] = useState('')

  // kanji display mode
  const [isStrokes, setIsStrokes] = useState(false)
  // prevent findDOMNode
  const normalRef = useRef(null),
    strokesRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      try {
        await axios.get(`${SERVER_URL}/kentei?kanji=${props.kanji}`).then((res) => {
          setKanji(res.data)
        })
        // setLoading(true)
      } catch (err) {
        console.log(err)
      }
    })()
  }, []) /* fuck off */ // eslint-disable-line react-hooks/exhaustive-deps

  const ToggleSwitch = () => {
    return (
      <fieldset>
        <input
          type="radio"
          id="normal"
          value="normal"
          name="display-mode"
          defaultChecked={!isStrokes}
          onChange={() => setIsStrokes(!isStrokes)}
        />
        <label htmlFor="normal">normal</label>
        <input
          type="radio"
          id="strokes"
          value="strokes"
          name="display-mode"
          defaultChecked={isStrokes}
          onChange={() => setIsStrokes(!isStrokes)}
        />
        <label htmlFor="strokes">strokes</label>
      </fieldset>
    )
  }

  return (
    <div className={styles.container}>
      <h2>
        <span>Kanji </span>
        <span>{props.kanji}</span>
      </h2>
      <div className={styles.content}>
        <div className={styles.kanjiContainer}>
          <div className={styles.kanji}>
            <CSSTransition
              in={!isStrokes}
              unmountOnExit
              timeout={300}
              classNames="normal"
              nodeRef={normalRef}
            >
              <div ref={normalRef} className={styles._normal}>
                {props.kanji}
              </div>
            </CSSTransition>
            <CSSTransition
              in={isStrokes}
              unmountOnExit
              timeout={300}
              classNames="strokes"
              nodeRef={strokesRef}
            >
              <div ref={strokesRef} className={styles._strokes}>
                {props.kanji}
              </div>
            </CSSTransition>
          </div>
          <ToggleSwitch onClick={() => setIsStrokes(!isStrokes)} />
        </div>
        <div className={styles.statsContainer}>
          <StatsItem item={kanji.strokes} label="strokes" />
          <StatsItem item={kanji.level} label="level" />
          <StatsItem item={kanji.radical} label="radicals" />
          <StatsItem item={kanji.index} label="index" />
          <StatsItem item={kanji.variant} label="variant" />
        </div>
      </div>
      <div className={styles.addsContainer}>
        <AddsItem label="意味" content={kanji.meaning} />
        <AddsItem label="音" content={kanji.onyomi} />
        <AddsItem label="訓" content={kanji.kunyomi} />
      </div>
    </div>
  )
}

const StatsItem = (props) => {
  return (
    <div className={styles.statsItem}>
      <span className={styles.statsValue}>{props.item ?? 'n/a'}</span>
      <span className={styles.statsLabel}>{props.label}</span>
    </div>
  )
}

const AddsItem = (props) => {
  return (
    <div className={styles.addsItem}>
      <span className={styles.addsLabel}>{props.label}</span>
      <span className={styles.addsContent}>{props.content}</span>
      <span className={styles.addsIcon}>
        <PenIcon />
      </span>
    </div>
  )
}

export default KenteiDetails
