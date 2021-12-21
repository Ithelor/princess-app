import styles from './Card.module.scss'

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles['card-header']}>
        <p className={styles.left}>
          <span>Variant:</span>

          <span>Radical:</span>
        </p>
        <p className={styles.right}>
          <span>Strokes:</span>

          <span>Level: </span>
        </p>
      </div>

      <div>
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
