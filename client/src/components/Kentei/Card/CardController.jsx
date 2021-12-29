import React from 'react'

import styles from './Card.module.scss'

const handleReadings = (id, reading, style) => {
  /*
    The tags below describe a reading's status:

    外 - outdated, shouldn't catch much attention,
    中 - moderately outdated, something to be aware of,
    高 - not outdated (?), display 高 just in case.

    All tags are displayed via pseudo-elements
      so that user would be aware of them.
  */

  const isOutdated = /［(外)］(.+)/,
    isNotEnoughOutdated = /(.+)［(中)］/,
    isNotOutdated = /(.+)［(高)］/

  // divide readings by comma, including tags
  const matched = reading.match(/(?:\([^)]*\)|[^、])+/g)

  let result = [],
    passedDeprecation = false

  matched.forEach((element) => {
    // handling 外 & 中 & 高

    const outdatedReading = element.match(isOutdated),
      notEnoughOutdatedReading = element.match(isNotEnoughOutdated),
      notOutdatedReading = element.match(isNotOutdated)

    let [, status, reading] = []
    outdatedReading && ([, status, reading] = outdatedReading)
    notEnoughOutdatedReading && ([, reading, status] = notEnoughOutdatedReading)
    notOutdatedReading && ([, reading, status] = notOutdatedReading)

    let key = id + reading,
      className = `${styles.label} ${styles[style]}`,
      content = reading

    switch (status) {
      case '外':
        className = `${styles.label} ${styles[style]} ${styles.外}`
        passedDeprecation = true
        break

      case '中':
      case '高':
        className = `${styles.label} ${styles[style]} ${styles.tagged}`
        break

      default:
        key = id + element
        if (passedDeprecation === true)
          className = `${styles.label} ${styles[style]} ${styles.外}`
        content = element
        break
    }

    result.push(
      // TODO: key the <></>
      <>
        <span key={key} className={className}>
          {content}
        </span>
        {status && status !== '外' && (
          <span key={key + 'tag'} className={styles.tag}>
            {status}
          </span>
        )}
      </>
    )
  })

  return result
}

const ContentController = ({ data }) => {
  const onControlled = handleReadings(data._id, data.onyomi, 'on'),
    kunControlled = handleReadings(data._id, data.kunyomi, 'kun')

  return (
    <div className={styles['sub-content']}>
      <div className={styles.row}>
        <span className={`${styles.label} ${styles.generic}`}>音読み</span>
        <div className={styles.readings}>{onControlled}</div>
      </div>
      <div className={styles.row}>
        <span className={`${styles.label} ${styles.generic}`}>訓読み</span>
        <div className={styles.readings}>{kunControlled}</div>
      </div>
      {/* <div className={styles.row}>
          <p>{data.meaning}</p>
        </div> */}
    </div>
  )
}

export default ContentController
