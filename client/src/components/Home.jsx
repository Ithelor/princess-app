import { useState, useEffect } from 'react'
import axios from 'axios'

export const Home = () => {

	const [pitchData, setPitchData] = useState([])
	const [loading, setLoading] = useState(false)

	const lyricsFunction = async () => {

		try {
			await axios
				.get(`http://localhost:5050/home`)
				.then(res => {
					setPitchData(res.data)
				})
			setLoading(true)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => { lyricsFunction() }, [])

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