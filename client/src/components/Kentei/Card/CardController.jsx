import React from 'react'

import styles from './Card.module.scss'

const handleReadings = (id, reading, style) => {
  /*
    The tags below describe a reading's status:

    外 - outdated, shouldn't catch much attention,
    中 - moderately outdated, something to be aware of,
    高 - not outdated (?), display 高 just in case.

    All tags are displayed via preudo-elements
      so that user would be aware of them.
  */

  const isOutdated = /(［外］)(.+)/,
    isNotEnoughOutdated = /(.+)(［中］)/,
    isNotOutdated = /(.+)(［高］)/

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
      className = `${styles.reading} ${styles[style]}`,
      content = reading

    switch (status) {
      case '［外］':
        className = `${styles.reading} ${styles[style]} ${styles.outdated}`
        passedDeprecation = true
        break
      case '［中］':
        className = `${styles.reading} ${styles[`${style}-neo`]}`
        break
      case '［高］':
        className = `${styles.reading} ${styles[`${style}-no`]}`
        break

      default:
        key = id + element
        if (passedDeprecation === true)
          className = `${styles.reading} ${styles[style]} ${styles.outdated}`
        content = element
        break
    }

    result.push(
      <span key={key} className={className}>
        {content}
      </span>
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
        <p>{onControlled}</p>
      </div>
      <div className={styles.row}>
        <span className={`${styles.label} ${styles.generic}`}>訓読み</span>
        <p>{kunControlled}</p>
      </div>
      {/* <div className={styles.row}>
          <p>{data.meaning}</p>
        </div> */}
    </div>
  )
}

export default ContentController