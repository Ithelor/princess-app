import { useState, useEffect } from 'react'
import axios from 'axios'

export const Home = () => {

	// handling data loading
	const [pitchData, setPitchData] = useState([])
	const [loading, setLoading] = useState(false)

	// handling pagination
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const [totalCount, setTotalCount] = useState(0)

	// TODO: resolve headers passing issue
	// try {
	// 	axios
	// 		.get(`http://localhost:5050/home/total`)
	// 		.then(res => {
	// 			setTotalCount(parseInt(res.data))
	// 			console.log(res.data)
	// 		})
	// } catch (err) {
	// 	console.log(err)
	// }

	// TODO: wtf is that warning?
	useEffect(() => {
		const lyricsFunction = async () => {
			if (fetching) {

				try {
					await axios
						.get(`http://localhost:5050/home?limit=35&page=${currentPage}`)
						.then(res => {
							setPitchData([...pitchData, ...res.data])
							setCurrentPage(prevState => prevState + 1)
							// setTotalCount(res.headers['total'])
							// console.log(res.headers)
							console.log(res.data)
						})
						.finally(() => setFetching(false))
					setLoading(true)
				} catch (err) {
					console.log(err)
				}
			}
		}
		lyricsFunction()
	}, [fetching]) // eslint-disable-line react-hooks/exhaustive-deps

	const scrollHandler = (e) => {

		console.log(`${pitchData.length} vs ${totalCount}`)

		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
			// && pitchData.length < totalCount
			) {
			setFetching(true)
			console.log(`fetching`)
		}
	}

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="landing">
			<h2>Home</h2>
			{loading ? (
				pitchData.map(pitch =>
					<p key={pitch._id}>{pitch.expression} {pitch.reading} {pitch.accent}</p>
				)
			) : (<svg className="spinner"></svg>)
			}
		</div>
	)
}