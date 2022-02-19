import React from 'react'
import { BsSearch as SearchIcon } from 'react-icons/bs'

import styles from './Searchbar.module.scss'

interface SearchbarProps {
  innerRef?: React.RefObject<HTMLInputElement>
  autoFocus?: boolean
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

const Searchbar = (props: SearchbarProps) => (
  <div className={styles.container}>
    <SearchIcon />
    <input
      ref={props.innerRef}
      autoFocus={props.autoFocus}
      type="search"
      autoComplete="off"
      placeholder={props.placeholder || 'サーチ。。'}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  </div>
)

export default Searchbar
