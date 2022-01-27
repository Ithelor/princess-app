import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import classNames from 'classnames'
import { BsPencilFill as PenIcon } from 'react-icons/bs'
import { motion } from 'framer-motion/dist/framer-motion'

import Controller from 'domains/Kentei/Controller/Controller'
import Modal from 'components/Modal/Modal.tsx'

import styles from './Details.module.scss'
import 'styles/index.scss'
import 'styles/partials/_anim.scss'

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const KC = new Controller()

const KenteiDetails = (props) => {
  // current data
  const [kanji, setKanji] = useState(props.kanjiCurrent)
  const [newKanji, setNewKanji] = useState('')
  // const [kanji, setKanji] = useState('')

  // kanji display mode
  const [isStrokes, setIsStrokes] = useState(false)
  // prevent findDOMNode
  const normalRef = useRef(null),
    strokesRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      try {
        await axios.get(`${SERVER_URL}/kentei?kanji=${kanji}`).then((res) => setNewKanji(res.data))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [kanji]) // eslint-disable-line react-hooks/exhaustive-deps

  const [currentPage, setCurrentPage] = useState(2)
  const offset = 4,
    limit = 9

  useEffect(() => {
    ;(async () => {
      try {
        await axios.get(`${SERVER_URL}/kentei?page=${currentPage}}&offset=${offset}&limit=${limit}`).then((res) => {
          // spread ... / []
          setCurrentPage((prevState) => prevState + 1)
        })
      } catch (err) {
        console.log(err)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedTab, setSelectedTab] = React.useState(props.kanjiCurrent)

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          {props.kanjiData.map((item) => (
            <li
              key={item._id}
              className={item.kanji === selectedTab && styles.selected}
              onClick={() => {
                setSelectedTab(item.kanji)
                setKanji(item.kanji)
                console.log(item.kanji)
              }}
            >
              {item.kanji}
              {item.kanji === selectedTab && <motion.div className={styles.sideline} layoutId="sideline" />}
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <h2>
          <span>Kanji </span>
          <span>{newKanji.kanji}</span>
        </h2>
        <div className={styles.content}>
          <div className={styles.kanjiContainer}>
            <div className={styles.kanji}>
              <CSSTransition in={!isStrokes} unmountOnExit timeout={300} classNames="normal" nodeRef={normalRef}>
                <div ref={normalRef} className={styles._normal}>
                  {newKanji.kanji}
                </div>
              </CSSTransition>
              <CSSTransition in={isStrokes} unmountOnExit timeout={300} classNames="strokes" nodeRef={strokesRef}>
                <div ref={strokesRef} className={styles._strokes}>
                  {newKanji.kanji}
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
            <StatsItem item={newKanji.strokes} label="strokes" />
            <StatsItem item={newKanji.level} label="level" />
            <StatsItem item={newKanji.radical} label="radicals" />
            <StatsItem item={newKanji.index} label="index" />
            <StatsItem item={newKanji.variant} label="variant" />
          </div>
        </div>
        <div className={styles.addsContainer}>
          <AddsItem label="意味" content={newKanji.meaning} clickable modalContent={newKanji} />
          <AddsItem label="音" content={newKanji && KC.handleReadings(newKanji._id, newKanji.onyomi, '_on')} />
          <AddsItem label="訓" content={newKanji && KC.handleReadings(newKanji._id, newKanji.kunyomi, '_kun')} />
        </div>
      </div>
    </div>
  )
}

/*
  StatsItem Component
*/
const StatsItem = (props) => {
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
// TODO: list controller / upd 25.01: what?

// TODO: display root dim on triggering modal
const AddsItem = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <Modal setIsOpen={setIsModalOpen} showExit showClose title="意味" content={props.modalContent.meaning} />
      )}
      <span className={styles.addsIcon}>
        <PenIcon />
      </span>
    </div>
  )
}

export default KenteiDetails
