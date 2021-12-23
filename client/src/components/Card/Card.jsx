import { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import axios from 'axios'

import styles from './Card.module.scss'

const Card = () => {
  // query params version // unused for now
  // const search = useLocation().search
  // const kanji = new URLSearchParams(search).get('kanji')

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  // no time for spinners
  // const [loading, setLoading] = useState(false)
  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

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
    <div className={styles.card}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          defaultValue="農"
          onChange={handleChange}
        />
        <ul>{}</ul>
      </div>

      {searchResults ? (
        <div>
          <div className={styles['card-header']}>
            <p className={styles.left}>
              <span>Variant: {searchResults.variant}</span>
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
              <span className={`${styles.reading} ${styles.on}`}>音読み</span>
              {searchResults.onyomi}
            </div>
            <div className={styles.row}>
              <span className={`${styles.reading} ${styles.kun}`}>訓読み</span>
              {searchResults.kunyomi}
            </div>
          </div>
        </div>
      ) : (
        'no time for spinners'
      )}
    </div>
  )
}

export default Card
