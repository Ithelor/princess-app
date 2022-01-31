import React from 'react'
import classNames from 'classnames'
import { AnimateSharedLayout, motion } from 'framer-motion'

import Controller from 'domains/Kentei/Controller/Controller'
import KenteiDetails from 'domains/Kentei/Details/Details'

import IKanji from 'interfaces/Kanji.interface'

import styles from './Card.module.scss'
import 'styles/partials/_anim.scss'

/*
 * CompactCard Component
 */
interface ICompactCard {
  kanji: String
  readings: { onyomi: HTMLDivElement[]; kunyomi: HTMLDivElement[] }
  onExpand: React.MouseEventHandler<HTMLDivElement>
  disabled: boolean
}
const CompactCard = (props: ICompactCard) => {
  return (
    <motion.div
      className={classNames(styles.container, styles._compact, { [styles._disabled]: props.disabled })}
      onClick={props.disabled ? undefined : props.onExpand}
    >
      <h2>{props.kanji}</h2>
      <hr />
      <div className={styles.details}>
        {props.readings.onyomi && (
          <div className={styles.row}>
            <span className={classNames(styles.label, styles._generic)}>音読み</span>
            <div className={styles.readings}>{props.readings.onyomi}</div>
          </div>
        )}
        {props.readings.kunyomi && (
          <div className={styles.row}>
            <span className={classNames(styles.label, styles._generic)}>訓読み</span>
            <div className={styles.readings}>{props.readings.kunyomi}</div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/*
 * ExpandedCard Component
 */
interface IExpandedCard {
  kanjiData: IKanji
  readings: { onyomi: HTMLDivElement[]; kunyomi: HTMLDivElement[] }
  onCollapse: React.MouseEventHandler<HTMLDivElement>
}
const ExpandedCard = (props: IExpandedCard) => {
  return (
    <motion.div className={classNames(styles.container, styles._expanded)} onClick={props.onCollapse}>
      <KenteiDetails kanjiCurrent={props.kanjiData} />
    </motion.div>
  )
}

/*
 * Card Component
 */
interface ICard {
  data: IKanji
  disabled: boolean
  onExpand: () => void
  onCollapse: () => void
}
const Card = (props: ICard) => {
  const KC = new Controller(),
    onyomi = KC.handleReadings(props.data._id, props.data.onyomi, '_on') as HTMLDivElement[],
    kunyomi = KC.handleReadings(props.data._id, props.data.kunyomi, '_kun') as HTMLDivElement[]

  const [isExpanded, setIsExpanded] = React.useState(false)

  const collapseKanji = () => {
    setIsExpanded(false)
    props.onCollapse()
  }

  const expandKanji = () => {
    setIsExpanded(true)
    props.onExpand()
  }

  return (
    <AnimateSharedLayout>
      {isExpanded ? (
        <ExpandedCard onCollapse={collapseKanji} kanjiData={props.data} readings={{ onyomi, kunyomi }} />
      ) : (
        <CompactCard
          onExpand={expandKanji}
          disabled={props.disabled}
          kanji={props.data.kanji}
          readings={{ onyomi, kunyomi }}
        />
      )}
    </AnimateSharedLayout>
  )
}

export default Card
