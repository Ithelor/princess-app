import { useState, useEffect } from 'react'
import axios from 'axios'

import Spinner from 'components/Spinner/Spinner'

import styles from './Kanjium.module.scss'
import 'styles/anim.scss'

const Home = () => {
  // handling data loading
  const [pitchData, setPitchData] = useState([])
  const [loading, setLoading] = useState(false)

  // handling pagination
  // 3546 * 35
  const totalCount = 124137
  const limit = 50
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (fetching) {
        try {
          await axios
            .get(
              `http://localhost:5050/kanjium?limit=${limit}&page=${currentPage}`
            )
            .then((res) => {
              setPitchData([...pitchData, ...res.data])
              setCurrentPage((prevState) => prevState + 1)
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
            <table className="fade-in">
              <thead>
                <tr>
                  <th>Expression</th>
                  <th>Reading</th>
                  <th>Pattern</th>
                </tr>
              </thead>
              <tbody onScroll={onScroll}>
                {pitchData.map((pitch) => (
                  <tr key={pitch._id} className="fade-in">
                    <td>{pitch.expression}</td>
                    <td>{pitch.reading}</td>
                    <td>{pitch.accent}</td>
                  </tr>
                ))}
                {fetching && (
                  <tr>
                    <td>
                      <Spinner />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </section>
      </article>
    </main>
  )
}

export default Home
