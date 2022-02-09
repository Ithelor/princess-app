import React from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { AnimatePresence, motion } from 'framer-motion'
import { BsPencilFill as PenIcon, BsXCircleFill as ModalExitIcon } from 'react-icons/bs'

import Modal from 'components/Modal/Modal'
import Spinner from 'components/Spinner/Spinner'

import handleReadings from 'helpers/handleReadings'

import useModal from 'hooks/useModal'
import IKanji from 'interfaces/Kanji.interface'

import styles from './Details.module.scss'
import 'styles/index.scss'
import 'styles/partials/_anim.scss'

/*
 * Details Component
 */
interface IDetails {
  kanjiArray?: IKanji[]
  kanjiCurrent: IKanji
}
const Details = (props: IDetails) => {
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
      {kanjiData ? (
        <>
          {props.kanjiArray && (
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
          )}
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={kanjiData.kanji as React.Key}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
              className={styles.detailsContainer}
            >
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
                <AddsItem label="意味" clickable noSelect modalContent={kanjiData}>
                  {kanjiData.meaning}
                </AddsItem>
                <AddsItem label="音">{kanjiData && handleReadings(kanjiData._id, kanjiData.onyomi, '_on')!}</AddsItem>
                <AddsItem label="訓">{kanjiData && handleReadings(kanjiData._id, kanjiData.kunyomi, '_kun')!}</AddsItem>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <Spinner fillGrid />
      )}
    </div>
  )
}

/*
 * StatsItem Component
 */
interface IStatsItem {
  item?: Number | String
  label: String
}
const StatsItem = (props: IStatsItem) => {
  return (
    <div className={styles.statsItem}>
      <span className={styles.statsValue}>{props.item ?? 'n/a'}</span>
      <span className={styles.statsLabel}>{props.label}</span>
    </div>
  )
}

/*
 * AddsItem Component
 */
interface IAddsItem {
  label: String
  clickable?: boolean
  noSelect?: boolean
  children: JSX.Element[] | String
  modalContent?: IKanji
}
const AddsItem = (props: IAddsItem) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <div className={styles.addsItem}>
      <span className={styles.addsLabel}>{props.label}</span>
      <span
        className={classNames(styles.addsContent, {
          [styles._clickable]: props.clickable,
          [styles._noSelect]: props.noSelect
        })}
        onClick={() => props.clickable && openModal()}
      >
        {props.children}
      </span>
      {isModalOpen && (
        <Modal handleClose={closeModal}>
          <h5 className={styles.heading}>意味</h5>
          <button className={styles.exitBtn} onClick={closeModal}>
            <ModalExitIcon />
          </button>
          <div className={styles.content}>{props.modalContent!.meaning}</div>
          <button className={styles.closeBtn} onClick={closeModal}>
            Close
          </button>
        </Modal>
      )}
      <span className={styles.addsIcon}>
        <PenIcon />
      </span>
    </div>
  )
}

export default Details
