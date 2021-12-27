import React from 'react'

import styles from './KenteiItem.module.scss'

const KenteiItem = ({ data, className }) => {
	return (
		<div className={`${styles.card} ${className}`}>
			<div className={styles['card-header']}>
				<p>
					<span>Variant: {data.variant ?? 'n/a'}</span>
					<span>Radical: {data.radical}</span>
					<span>Strokes: {data.strokes}</span>
					<span>Level: {data.level}</span>
				</p>
			</div>
			<div>
				<h2>{data.kanji}</h2>
				<hr />
			</div>
			<div className={styles['sub-content']}>
				<div className={styles.row}>
					<span className={`${styles.label} ${styles.on}`}>音読み</span>
					<p>{data.onyomi}</p>
				</div>
				<div className={styles.row}>
					<span className={`${styles.label} ${styles.kun}`}>訓読み</span>
					<p>{data.kunyomi}</p>
				</div>
				{/* <div className={styles.row}>
          <p>{data.meaning}</p>
        </div> */}
			</div>
		</div>
	)
}

export default KenteiItem
