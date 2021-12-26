import React from 'react'

import './SearchBar.module.scss'

const SearchBar = (props) => {
  return (
    <input
      type="search"
      id="search"
      autoComplete="off"
      placeholder="サーチ 。。"
      maxLength="10"
      // defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  )
}

export default SearchBar
