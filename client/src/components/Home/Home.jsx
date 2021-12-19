import { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './Home.module.scss'

const Home = () => {
  // handling data loading
  const [pitchData, setPitchData] = useState([])
  const [loading, setLoading] = useState(false)

  // handling pagination
  const [currentPage, setCurrentPage] = useState(1) // 3546 * 35
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (fetching) {
        console.log(`fetching: ${pitchData.length} / ${totalCount}`)

        try {
          await axios
            .get(`http://localhost:5050/home?limit=50&page=${currentPage}`)
            .then((res) => {
              setPitchData([...pitchData, ...res.data])
              setCurrentPage((prevState) => prevState + 1)
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

  const onScroll = (e) => {
    if (
      e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 250 &&
      pitchData.length < totalCount
    ) {
      setFetching(true)
    }
  }

  return (
    <main>
      <article>
        <h2 className={styles.title}>高低アクセント</h2>
        <section className={styles['jtp-table']}>
          {loading ? (
            <table className={styles['fade-in']}>
              <thead>
                <tr>
                  <th>Expression</th>
                  <th>Reading</th>
                  <th>Pattern</th>
                </tr>
              </thead>
              <tbody onScroll={onScroll}>
                {pitchData.map((pitch) => (
                  <tr key={pitch._id} className={styles['fade-in']}>
                    <td>{pitch.expression}</td>
                    <td>{pitch.reading}</td>
                    <td>{pitch.accent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <svg className={styles.spinner}></svg>
          )}
        </section>
      </article>
    </main>
  )
}

export default Home
