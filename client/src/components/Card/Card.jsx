import styles from './Card.module.scss'

// basic card layout
//

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles['main-content']}>
        <h2>農</h2>
        <hr />
      </div>
      <div className={styles['sub-content']}>
        <div className={styles.row}>
          <span className={`${styles.reading} ${styles.on}`}>音読み</span>
          ノウ
        </div>
        <div className={styles.row}>
          <span className={`${styles.reading} ${styles.kun}`}>訓読み</span>ー
        </div>
      </div>
    </div>
  )
}

export default Card
