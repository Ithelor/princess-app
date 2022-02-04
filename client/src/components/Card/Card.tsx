import React from 'react'
import classNames from 'classnames'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import {
  BsWindow as ExpandIcon,
  BsArrowDown as UnfoldIcon,
  BsChevronLeft as ScrollLeftIcon,
  BsChevronRight as ScrollRightIcon
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
  data: IKanji
  readings: { onyomi: HTMLDivElement[]; kunyomi: HTMLDivElement[] }
  onExpand: React.MouseEventHandler<HTMLButtonElement>
  onMaximize: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}
const CompactCard = (props: ICompactCard) => {
  return (
    <motion.div className={classNames(styles.compact, { [styles._disabled]: props.disabled })}>
      <span className={styles.controls}>
        <button onClick={props.onExpand}>
          <UnfoldIcon />
        </button>
        <button onClick={props.disabled ? undefined : props.onMaximize}>
          <ExpandIcon />
        </button>
      </span>
      <h2>{props.data.kanji}</h2>
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
    <motion.div className={classNames(styles.container)} onClick={props.onCollapse}>
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
  const [scrollX, setScrollX] = React.useState(0)
  const [scrollEnd, setScrollEnd] = React.useState(false)

  const scrollRef = React.useRef<HTMLUListElement>(null)
  const cardRefs = React.useRef<HTMLLIElement[]>(new Array(props.kanjiArray?.length))

  const checkScroll = () => {
    if (Math.floor(scrollRef.current!.scrollWidth - scrollRef.current!.scrollLeft) <= scrollRef.current!.offsetWidth)
      setScrollEnd(true)
    else setScrollEnd(false)
  }

  const scrollToCard = (id: number) => {
    cardRefs.current[id].scrollIntoView({
      behavior: 'smooth',
      inline: 'center'
    })
  }

  React.useEffect(() => {
    scrollToCard(props.kanjiData.index)
  }, [props.kanjiData.index])

  return (
    <div className={styles.dim} onClick={props.onCollapse}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.maximized}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={classNames({ [styles._disabled]: scrollX === 0 })}
          onClick={() => (scrollRef.current!.scrollLeft = 0)}
        >
          <ScrollLeftIcon />
        </button>
        <ul
          ref={scrollRef}
          onScroll={() => {
            setScrollX(scrollRef.current!.scrollLeft)
            checkScroll()
          }}
          onWheel={(event) => (scrollRef.current!.scrollLeft += event.deltaY * 3)}
        >
          {props.kanjiArray?.map((item) => {
            return (
              <InView threshold={0.9}>
                {({ ref, inView }) => (
                  <motion.li
                    ref={(el) => (cardRefs.current[item.index] = el!)}
                    className={styles.card}
                    onClick={() => scrollToCard(item.index)}
                    animate={inView ? { opacity: 1 } : { opacity: 0.25 }}
                    transition={{ duration: 0.1 }}
                  >
                    <h3 ref={ref} className={classNames({ [styles._inView]: inView })}>
                      {item.kanji}
                    </h3>
                  </motion.li>
                )}
              </InView>
            )
          })}
        </ul>
        <button
          className={classNames({ [styles._disabled]: scrollEnd })}
          onClick={() => (scrollRef.current!.scrollLeft = scrollRef.current!.scrollWidth)}
        >
          <ScrollRightIcon />
        </button>
      </motion.div>
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
          data={props.data}
          readings={{ onyomi, kunyomi }}
          onExpand={unfoldCard}
          onMaximize={maximizeCard}
          disabled={props.disabled}
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
