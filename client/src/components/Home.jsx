import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

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
						.get(`http://localhost:5050/home?limit=35&page=${currentPage}`)
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
	}, [fetching]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return () => document.removeEventListener('scroll', scrollHandler)
	}, [totalCount, scrollHandler])

	return (
		<div className="landing">
			<h2>Home</h2>
			{
			loading ? (
				pitchData.map(pitch =>
					<p key={pitch._id}>{pitch.expression} {pitch.reading} {pitch.accent}</p>
				)
			) : (<svg className="spinner"></svg>)
			}
		</div>
	)
}