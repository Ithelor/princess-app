import React from 'react'

import styles from './SearchBar.module.scss'

const SearchBar = (props) => {
  return (
    <div className={styles['search-bar']}>
      <input
        type="search"
        id="search"
        autoComplete="off"
        placeholder="サーチ 。。"
        defaultValue={props.defaultValue}
        maxLength="10"
        onChange={props.onChange}
      />
    </div>
  )
}

export default SearchBar
