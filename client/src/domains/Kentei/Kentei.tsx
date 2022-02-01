import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import Card from 'components/Card/Card'
import KenteiDetails from './Details/Details'
import SearchBar from 'components/SearchBar/SearchBar'
import Spinner from 'components/Spinner/Spinner'

import IKanji from 'interfaces/Kanji.interface'

import styles from './Kentei.module.scss'

import { debounce } from 'Utils.js'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Kentei = () => {
  // query params
  const queryKanji = new URLSearchParams(useLocation().search).get('kanji')

  // TODO: fix search
  const [searchTerm, setSearchTerm] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<IKanji>() // []

  // TODO: make dynamic ?
  const limit = 30
  // TODO: get from the server
  const totalCount = 6355

  const [kanjiArray, setkanjiArray] = React.useState<IKanji[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)

  const [loading, setLoading] = React.useState(true)
  const [fetching, setFetching] = React.useState(true)

  const [expandedKanji, setExpandedKanji] = React.useState<IKanji | undefined>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    setSearchTerm(event.target.value)
  }
  const optimisedHandleChange = debounce(handleChange, 500)

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLElement
    if (container.scrollHeight - (container.scrollTop + window.innerHeight) < 250 && kanjiArray.length < totalCount) {
      setFetching(true)
    }
  }

  React.useEffect(() => {
    ;(async () => {
      try {
        await axios.get(`${SERVER_URL}/kentei?kanji=${searchTerm}`).then((res) => setSearchResults(res.data))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [searchTerm])

  React.useEffect(() => {
    ;(async () => {
      if (fetching) {
        try {
          await axios
            .get(`${SERVER_URL}/kentei?limit=${limit}&page=${currentPage}`)
            .then((res) => {
              setkanjiArray([...kanjiArray, ...res.data])
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

  return (
    <article className={styles.container}>
      <SearchBar onChange={optimisedHandleChange} />
      {queryKanji ? (
        <KenteiDetails
          kanjiArray={kanjiArray}
          kanjiCurrent={
            kanjiArray.find((kanjiData) => {
              return kanjiData.kanji === queryKanji
            })!
          }
        />
      ) : (
        <section className={styles.grid} onScroll={onScroll}>
          {loading ? (
            <div className={styles.fill}>
              <Spinner />
            </div>
          ) : searchResults ? (
            <Card
              key={searchResults._id as React.Key}
              data={searchResults}
              disabled={expandedKanji?.kanji !== searchResults?.kanji && expandedKanji !== undefined}
              onExpand={() => setExpandedKanji(expandedKanji)}
              onCollapse={() => setExpandedKanji(undefined)}
            />
          ) : (
            <>
              {kanjiArray.map((kanjiData) => (
                <Card
                  key={kanjiData._id as React.Key}
                  data={kanjiData}
                  array={kanjiArray}
                  disabled={expandedKanji?.kanji !== kanjiData.kanji && expandedKanji !== undefined}
                  onExpand={() => setExpandedKanji(kanjiData)}
                  onCollapse={() => setExpandedKanji(undefined)}
                />
              ))}
              {fetching && (
                <div className={styles.fill}>
                  <Spinner />
                </div>
              )}
            </>
          )}
        </section>
      )}
    </article>
  )
}

export default Kentei
