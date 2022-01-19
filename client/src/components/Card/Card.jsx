import classNames from 'classnames'

import Controller from 'domains/Kentei/Controller/Controller'

import styles from './Card.module.scss'

const KenteiItem = ({ data }) => {
  const KC = new Controller(),
    onyomi = KC.handleReadings(data._id, data.onyomi, '_on'),
    kunyomi = KC.handleReadings(data._id, data.kunyomi, '_kun')

  return (
    <div className={styles.container}>
      <h2>{data.kanji}</h2>
      <hr />
      <div className={styles.details}>
        {onyomi && (
          <div className={styles.row}>
            <span className={classNames(styles.label, styles._generic)}>音読み</span>
            <div className={styles.readings}>{onyomi}</div>
          </div>
        )}
        {kunyomi && (
          <div className={styles.row}>
            <span className={classNames(styles.label, styles._generic)}>訓読み</span>
            <div className={styles.readings}>{kunyomi}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KenteiItem
