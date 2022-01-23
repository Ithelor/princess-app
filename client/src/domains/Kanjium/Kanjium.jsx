import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import SearchBar from 'components/SearchBar/SearchBar'
import Spinner from 'components/Spinner/Spinner'
import KanjiumGraph from './PitchGraph'

import styles from './Kanjium.module.scss'
import 'styles/partials/_anim.scss'

import { debounce } from 'Utils.js'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Home = () => {
  // handling data loading
  const [pitchData, setPitchData] = useState([])
  const [loading, setLoading] = useState(true)

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
            .get(`${SERVER_URL}/kanjium?limit=${limit}&page=${currentPage}`)
            .then((res) => {
              setPitchData([...pitchData, ...res.data])
              setCurrentPage((prevState) => prevState + 1)
            })
            .finally(() => {
              setLoading(false)
              setFetching(false)
            })
        } catch (err) {
          console.log(err)
        }
      }
    })()
  }, [fetching]) // eslint-disable-line react-hooks/exhaustive-deps

  const onScroll = (e) => {
    if (
      e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 250 &&
      pitchData.length < totalCount
    ) {
      setFetching(true)
    }
  }

  const graphRef = useRef(null)
  const [graphWidth, setGraphWidth] = useState(0)

  useEffect(() => {
    if (graphRef.current) {
      setGraphWidth(graphRef.current.offsetWidth)
    }
  }, [graphRef, loading, fetching])

  /*
    { Handling window resize graphsのために
  */
  const updateDimensions = debounce(() => {
    if (graphRef.current) {
      setGraphWidth(graphRef.current.offsetWidth)
    }
  }, 50)

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  /*
    }
  */

  return (
    <article className={styles.container}>
      <SearchBar />
      <section className={styles.jptWrapper}>
        {!loading ? (
          <table className="fade-in">
            <thead>
              <tr>
                <th>Expression</th>
                <th>Reading</th>
                <th>Pitch</th>
              </tr>
            </thead>
            <tbody onScroll={onScroll}>
              {pitchData.map((pitch) => (
                <tr key={pitch._id} className="fade-in">
                  <td>{pitch.expression}</td>
                  <td>{pitch.reading}</td>
                  <td ref={graphRef}>
                    <KanjiumGraph pattern={pitch.accent} graphWidth={graphWidth} />
                  </td>
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
  )
}

export default Home
