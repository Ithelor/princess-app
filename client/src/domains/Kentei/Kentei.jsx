import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import KenteiItem from 'components/Card/Card'
import KenteiDetails from './Details/Details'
import SearchBar from 'components/SearchBar/SearchBar'
import Spinner from 'components/Spinner/Spinner'

import styles from './Kentei.module.scss'
import 'styles/partials/_anim.scss'

import { debounce } from 'Utils.js'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

// TODO: fix false display on page load
const Card = () => {
  // query params
  const search = useLocation().search
  const kanji = new URLSearchParams(search).get('kanji')

  // TODO: fix search
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(undefined) // []

  const handleChange = (event) => {
    event.persist()
    setSearchTerm(event.target.value)
  }

  const optimisedHandleChange = debounce(handleChange, 500)

  useEffect(() => {
    ;(async () => {
      try {
        await axios.get(`${SERVER_URL}/kentei?kanji=${searchTerm}`).then((res) => {
          setSearchResults(res.data)
        })
        // TODO: setLoading(true)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [searchTerm])

  const limit = 15
  const totalCount = 6355
  const [kanjiData, setKanjiData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (fetching) {
        try {
          await axios
            .get(`${SERVER_URL}/kentei?limit=${limit}&page=${currentPage}`)
            .then((res) => {
              setKanjiData([...kanjiData, ...res.data])
              setCurrentPage((prevState) => prevState + 1)
            })
            .finally(() => setFetching(false))
          setLoading(true)
        } catch (err) {
          console.log(err)
        }
      }
    })()
  }, [fetching]) // eslint-disable-line react-hooks/exhaustive-deps

  const onScroll = (e) => {
    if (
      e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 250 &&
      kanjiData.length < totalCount
    ) {
      setFetching(true)
    }
  }

  return (
    <article className={styles.container}>
      <SearchBar onChange={optimisedHandleChange} />
      {kanji ? (
        <KenteiDetails kanji={kanji} />
      ) : (
        <section className={styles.grid} onScroll={onScroll}>
          {searchResults ? (
            <KenteiItem
              key={searchResults._id}
              data={searchResults}
              className="fade-in"
            />
          ) : loading ? (
            kanjiData.map((kanji) => (
              <KenteiItem key={kanji._id} data={kanji} className="fade-in" />
            ))
          ) : (
            (fetching || !loading) && (
              <div className={styles.fill}>
                <Spinner />
              </div>
            )
          )}
        </section>
      )}
    </article>
  )
}

export default Card
