import React from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { motion } from 'framer-motion'
import { BsPencilFill as PenIcon } from 'react-icons/bs'

import Controller from 'domains/Kentei/Controller/Controller'
import Modal from 'components/Modal/Modal'

import IKanji from 'interfaces/Kanji.interface'

import styles from './Details.module.scss'
import 'styles/index.scss'
import 'styles/partials/_anim.scss'

const KC = new Controller()

interface IKenteiDetails {
  kanjiArray: IKanji[]
  kanjiCurrent: IKanji
}

const KenteiDetails = (props: IKenteiDetails) => {
  const [kanjiData, setKanjiData] = React.useState<IKanji>()
  React.useEffect(() => setKanjiData(props.kanjiCurrent), [props.kanjiCurrent])

  const [isStrokes, setIsStrokes] = React.useState(false)

  // prevent findDOMNode
  const normalRef = React.useRef(null),
    strokesRef = React.useRef(null)

  const navigate = useNavigate()
  const goToKanji = (kanji: String) => navigate(`../kentei?kanji=${kanji}`, { replace: true })

  return (
    <div className={styles.container}>
      {kanjiData && (
        <>
          <nav>
            <ul>
              {props.kanjiArray.map((item) => (
                <li
                  key={item._id as React.Key}
                  className={classNames({ [styles.selected]: item.kanji === kanjiData.kanji })}
                  onClick={() => {
                    setKanjiData(item)
                    goToKanji(item.kanji)
                  }}
                >
                  {item.kanji}
                  {item.kanji === kanjiData.kanji && <motion.div className={styles.sideline} layoutId="sideline" />}
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>
              <span>Kanji </span>
              <span>{kanjiData.kanji}</span>
            </h2>
            <div className={styles.content}>
              <div className={styles.kanjiContainer}>
                <div className={styles.kanji}>
                  <CSSTransition in={!isStrokes} unmountOnExit timeout={300} classNames="normal" nodeRef={normalRef}>
                    <div ref={normalRef} className={styles._normal}>
                      {kanjiData.kanji}
                    </div>
                  </CSSTransition>
                  <CSSTransition in={isStrokes} unmountOnExit timeout={300} classNames="strokes" nodeRef={strokesRef}>
                    <div ref={strokesRef} className={styles._strokes}>
                      {kanjiData.kanji}
                    </div>
                  </CSSTransition>
                </div>
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
              </div>
              <div className={styles.statsContainer}>
                <StatsItem item={kanjiData.strokes} label="strokes" />
                <StatsItem item={kanjiData.level} label="level" />
                <StatsItem item={kanjiData.radical} label="radicals" />
                <StatsItem item={kanjiData.index} label="index" />
                <StatsItem item={kanjiData.variant} label="variant" />
              </div>
            </div>
            <div className={styles.addsContainer}>
              <AddsItem label="意味" content={kanjiData.meaning} clickable modalContent={kanjiData} />
              <AddsItem label="音" content={kanjiData && KC.handleReadings(kanjiData._id, kanjiData.onyomi, '_on')!} />
              <AddsItem
                label="訓"
                content={kanjiData && KC.handleReadings(kanjiData._id, kanjiData.kunyomi, '_kun')!}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/*
  StatsItem Component
*/
const StatsItem = (props: { item?: Number | String; label: String }) => {
  return (
    <div className={styles.statsItem}>
      <span className={styles.statsValue}>{props.item ?? 'n/a'}</span>
      <span className={styles.statsLabel}>{props.label}</span>
    </div>
  )
}

/*
  AddsItem Component
*/
// TODO: fix clickable (wtf how) readings
// TODO: display root dim on triggering modal
const AddsItem = (props: {
  label: String
  clickable?: boolean
  content: String | HTMLDivElement[]
  modalContent?: IKanji
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <div className={styles.addsItem}>
      <span className={styles.addsLabel}>{props.label}</span>
      <span
        className={classNames(styles.addsContent, {
          [styles._clickable]: props.clickable
        })}
        onClick={() => setIsModalOpen(true)}
      >
        {props.content}
      </span>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen} showExit showClose title="意味" content={props.modalContent!.meaning} />
      )}
      <span className={styles.addsIcon}>
        <PenIcon />
      </span>
    </div>
  )
}

export default KenteiDetails
