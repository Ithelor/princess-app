import classNames from 'classnames'

import Controller from 'domains/Kentei/Controller/Controller'

import styles from './Card.module.scss'
import 'styles/partials/_anim.scss'

const KenteiItem = (props) => {
  const KC = new Controller(),
    onyomi = KC.handleReadings(props.data._id, props.data.onyomi, '_on'),
    kunyomi = KC.handleReadings(props.data._id, props.data.kunyomi, '_kun')

  return (
    <div className={classNames(styles.container, 'fade-in')}>
      <h2>{props.data.kanji}</h2>
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
