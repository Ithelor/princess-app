import { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import axios from 'axios'

import styles from './Kentei.module.scss'
import SearchBar from 'components/SearchBar/SearchBar'

const DEFAULT_TERM = '鍵'

// TODO: controller
// TODO: loading spinner logic
// TODO: fix false display on page load
const Card = () => {
  // query params version // unused for now
  // const search = useLocation().search
  // const kanji = new URLSearchParams(search).get('kanji')

  const [searchTerm, setSearchTerm] = useState(DEFAULT_TERM)
  const [searchResults, setSearchResults] = useState([])
  // no time for spinners
  // const [loading, setLoading] = useState(false)

  const debounce = (func, delay) => {
    let debounceTimer
    return function () {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
  }

  const handleChange = (event) => {
    event.persist()
    setSearchTerm(event.target.value)
  }

  const optimisedHandleChange = debounce(handleChange, 500)

  useEffect(() => {
    ;(async () => {
      try {
        await axios
          .get(`http://localhost:5050/kentei?kanji=${searchTerm}`)
          .then((res) => {
            setSearchResults(res.data)
            console.log(res.data)
          })
        // setLoading(true)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [searchTerm])

  return (
    <div>
      <div className={styles.card}>
        <SearchBar
          defaultValue={DEFAULT_TERM}
          onChange={optimisedHandleChange}
        />
        {searchResults ? (
          <div>
            <div className={styles['card-header']}>
              <p className={styles.left}>
                {searchResults.variant && (
                  <span>Variant: {searchResults.variant}</span>
                )}
                <span>Radical: {searchResults.radical}</span>
              </p>
              <p className={styles.right}>
                <span>Strokes: {searchResults.strokes}</span>
                <span>Level: {searchResults.level}</span>
              </p>
            </div>
            <div>
              <h2>{searchResults.kanji}</h2>
              <hr />
            </div>
            <div className={styles['sub-content']}>
              <div className={styles.row}>
                <span className={`${styles.label} ${styles.on}`}>音読み</span>
                <p>{searchResults.onyomi}</p>
              </div>
              <div className={styles.row}>
                <span className={`${styles.label} ${styles.kun}`}>訓読み</span>
                <p>{searchResults.kunyomi}</p>
              </div>
              <div className={styles.row}>
                <p>{searchResults.meaning}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles['search-results-placeholder']}>
            Results will appear hear if present 。。
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
