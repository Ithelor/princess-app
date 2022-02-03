import React from 'react'
import classNames from 'classnames'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import {
  BsWindow as ExpandIcon,
  BsArrowDown as UnfoldIcon,
  BsArrowLeftShort as ScrollLeftIcon,
  BsArrowRightShort as ScrollRightIcon
} from 'react-icons/bs'

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
  onExpand: React.MouseEventHandler<HTMLButtonElement>
  onMaximize: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}
const CompactCard = (props: ICompactCard) => {
  return (
    <motion.div className={classNames(styles.container, styles.compact, { [styles._disabled]: props.disabled })}>
      <span className={styles.controls}>
        <button onClick={props.onExpand}>
          <UnfoldIcon />
        </button>
        <button onClick={props.disabled ? undefined : props.onMaximize}>
          <ExpandIcon />
        </button>
      </span>
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
 * UnfoldedCard Component
 */
interface IUnfoldedCard {
  kanjiData: IKanji
  readings: { onyomi: HTMLDivElement[]; kunyomi: HTMLDivElement[] }
  onCollapse: React.MouseEventHandler<HTMLDivElement>
}
const UnfoldedCard = (props: IUnfoldedCard) => {
  return (
    <motion.div className={classNames(styles.container, styles.expanded)} onClick={props.onCollapse}>
      <KenteiDetails kanjiCurrent={props.kanjiData} />
    </motion.div>
  )
}

/*
 * MaximizedCard Component
 */
interface IMaximizedCard {
  kanjiData: IKanji
  kanjiArray?: IKanji[]
  readings: { onyomi: HTMLDivElement[]; kunyomi: HTMLDivElement[] }
  onCollapse: React.MouseEventHandler<HTMLDivElement>
}
const MaximizedCard = (props: IMaximizedCard) => {
  const [currentCard] = React.useState(props.kanjiData)

  const scrollRef = React.useRef<HTMLUListElement>(null)
  const [scrollX, setScrollX] = React.useState(0)
  const [scrollEnd, setScrollEnd] = React.useState(false)

  const checkScroll = () => {
    if (Math.floor(scrollRef.current!.scrollWidth - scrollRef.current!.scrollLeft) <= scrollRef.current!.offsetWidth)
      setScrollEnd(true)
    else setScrollEnd(false)
  }

  const cardRefs = React.useRef<HTMLLIElement[]>(new Array(props.kanjiArray?.length))

  const scrollToCard = (id: number) => {
    cardRefs.current[id].scrollIntoView({
      behavior: 'smooth',
      inline: 'center'
    })
  }

  return (
    <div className={styles.dim} onClick={props.onCollapse}>
      <div className={styles.container}>
        {scrollX !== 0 && (
          <button
            onClick={(event) => {
              event.stopPropagation()
              scrollRef.current!.scrollLeft = 0
            }}
          >
            <ScrollLeftIcon />
          </button>
        )}
        <ul
          ref={scrollRef}
          onClick={(event) => event.stopPropagation()}
          onScroll={() => {
            setScrollX(scrollRef.current!.scrollLeft)
            checkScroll()
          }}
        >
          {props.kanjiArray?.map((item) => {
            return (
              <InView threshold={1}>
                {({ ref, inView }) => (
                  <motion.li
                    ref={(el) => (cardRefs.current[item.index] = el!)}
                    className={classNames(styles.card, { [styles.additional]: item !== currentCard })}
                    onClick={() => scrollToCard(item.index)}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 ref={ref}>{item.kanji}</h3>
                  </motion.li>
                )}
              </InView>
            )
          })}
        </ul>
        {!scrollEnd && (
          <button
            onClick={(event) => {
              event.stopPropagation()
              scrollRef.current!.scrollLeft = scrollRef.current!.scrollWidth
            }}
          >
            <ScrollRightIcon />
          </button>
        )}
      </div>
    </div>
  )
}

/*
 * Card Component
 */
interface ICard {
  data: IKanji
  array?: IKanji[]
  disabled: boolean
  onCollapse: () => void
  onExpand: () => void
}
const Card = (props: ICard) => {
  const KC = new Controller(),
    onyomi = KC.handleReadings(props.data._id, props.data.onyomi, '_on') as HTMLDivElement[],
    kunyomi = KC.handleReadings(props.data._id, props.data.kunyomi, '_kun') as HTMLDivElement[]

  const [cardType, setCardType] = React.useState('compact')

  const collapseCard = () => {
    setCardType('compact')
    props.onCollapse()
  }

  // both receive kanji data (i.e. props.onExpand())
  const unfoldCard = () => {
    setCardType('unfolded')
    props.onExpand()
  }
  const maximizeCard = () => {
    setCardType('maximized')
    props.onExpand()
  }

  return (
    <AnimateSharedLayout>
      {cardType === 'compact' && (
        <CompactCard
          onExpand={unfoldCard}
          onMaximize={maximizeCard}
          disabled={props.disabled}
          kanji={props.data.kanji}
          readings={{ onyomi, kunyomi }}
        />
      )}
      {cardType === 'unfolded' && (
        <UnfoldedCard onCollapse={collapseCard} kanjiData={props.data} readings={{ onyomi, kunyomi }} />
      )}
      {cardType === 'maximized' && (
        <MaximizedCard
          onCollapse={collapseCard}
          kanjiData={props.data}
          kanjiArray={props.array}
          readings={{ onyomi, kunyomi }}
        />
      )}
    </AnimateSharedLayout>
  )
}

export default Card
