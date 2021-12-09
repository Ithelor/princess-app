import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import styles from './Home.module.scss'

export const Home = () => {

	// handling data loading
	const [pitchData, setPitchData] = useState([])
	const [loading, setLoading] = useState(false)

	// handling pagination
	const [currentPage, setCurrentPage] = useState(1) // 3546 * 35
	const [fetching, setFetching] = useState(true)
	const [totalCount, setTotalCount] = useState(0)

	const scrollHandler = useCallback((e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
			&& pitchData.length < totalCount
		) {
			setFetching(true)
		}
	}, [totalCount, pitchData])

	useEffect(() => {
		(async () => {
			if (fetching) {
				console.log(`fetching: ${pitchData.length} / ${totalCount}`)

				try {
					await axios
						.get(`http://localhost:5050/home?limit=50&page=${currentPage}`)
						.then(res => {
							setPitchData([...pitchData, ...res.data])
							setCurrentPage(prevState => prevState + 1)
							setTotalCount(res.headers['total'])
						})
						.finally(() => setFetching(false))
					setLoading(true)
				} catch (err) {
					console.log(err)
				}
			}
		})()
	}, [fetching]) /* fuck off */ // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return () => document.removeEventListener('scroll', scrollHandler)
	}, [totalCount, scrollHandler])

	return (
		<article className={styles.home}>
			{
				loading ? (
					<table className={styles['fade-in']}>
						<thead>
							<tr>
								<th>Expression</th>
								<th>Reading</th>
								<th>Pattern</th>
							</tr>
						</thead>
						<tbody>
							{pitchData.map(pitch =>
								<tr key={pitch._id} className={styles['fade-in']}>
									<td>{pitch.expression}</td>
									<td>{pitch.reading}</td>
									<td>{pitch.accent}</td>
								</tr>)}
						</tbody>
					</table>
				) : (<svg className={styles.spinner}></svg>)
			}

		</article>
	)
}