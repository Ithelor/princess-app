import React from 'react'

import styles from 'components/Kentei/KenteiItem/KenteiItem.module.scss'

// old code for native js
// slightly revised in order to work with React
// TODO: needs more thorough revision
const handleReadings = (id, reading, style) => {
  // outdated reading, shouldn't catch much attention
  const isOutdated = /［外］(.+)/,
    // moderately outdated reading, something to be aware of
    isNotEnoughOutdated = /(.+)［中］/,
    // not outdated (?), display 高 just in case
    isNotOutdated = /(.+)［高］/,
    // divide readings by comma, including tags
    re = /(?:\([^)]*\)|[^、])+/g

  const matched = reading.match(re)
  let result = [],
    passedDeprecation = false,
    finalReading

  matched.forEach((element) => {
    // handling 外 & 中 & 高 tags

    let deprecatedReading = element.match(isOutdated)
    let notEnoughDeprecatedReading = element.match(isNotEnoughOutdated)
    let notDeprecatedReading = element.match(isNotOutdated)

    if (notDeprecatedReading) {
      finalReading = (
        <span
          key={id + notDeprecatedReading[1]}
          className={`${styles.reading} ${styles[`${style}-nd`]}`}>
          {notDeprecatedReading[1]}
        </span>
      )
    } else if (notEnoughDeprecatedReading) {
      finalReading = (
        <span
          key={id + notEnoughDeprecatedReading[1]}
          className={`${styles.reading} ${styles[`${style}-ned`]}`}>
          {notEnoughDeprecatedReading[1]}
        </span>
      )
    } else if (deprecatedReading) {
      finalReading = (
        <span
          key={id + deprecatedReading[1]}
          className={`${styles.reading} ${styles[style]} ${styles.deprecated}`}>
          {deprecatedReading[1]}
        </span>
      )
      passedDeprecation = true
    } else if (passedDeprecation === true) {
      finalReading = (
        <span
          key={id + element}
          className={`${styles.reading} ${styles[style]} ${styles.deprecated}`}>
          {element}
        </span>
      )
    } else {
      finalReading = (
        <span
          key={id + element}
          className={`${styles.reading} ${styles[style]}`}>
          {element}
        </span>
      )
    }

    result.push(finalReading)
  })

  return result
}

const ContentController = ({ id, data }) => {
  const onControlled = handleReadings(id, data.onyomi, 'on')
  const kunControlled = handleReadings(id, data.kunyomi, 'kun')

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
