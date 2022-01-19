import classNames from 'classnames'

import styles from './Controller.module.scss'

export default class KenteiController {
  handleReadings = (id, reading, style) => {
    /*
      The tags below describe a reading's status:

      外 - outdated, shouldn't catch much attention,
      中 - moderately outdated, something to be aware of,
      高 - not outdated (?), display 高 just in case.

      All tags are displayed next to their respective readings
    */

    const isOutdated = /［(外)］(.+)/,
      isNotEnoughOutdated = /(.+)［(中)］/,
      isNotOutdated = /(.+)［(高)］/

    if (reading) {
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
          className = classNames(styles.label, styles[style]),
          content = reading

        switch (status) {
          case '外':
            className = classNames(styles.label, styles[style], styles._外)
            passedDeprecation = true
            break

          case '中':
          case '高':
            className = classNames(styles.label, styles[style], styles._tagged)
            break

          default:
            key = id + element
            if (passedDeprecation === true)
              className = classNames(styles.label, styles[style], styles._外)
            content = element
            break
        }

        result.push(
          // TODO: key something
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
  }
}
