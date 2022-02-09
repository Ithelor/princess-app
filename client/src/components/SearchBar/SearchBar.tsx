import React from 'react'
import { BsSearch as SearchIcon } from 'react-icons/bs'

import styles from './Searchbar.module.scss'

interface SearchbarProps {
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

// nope, no FC.defaultValue 'cause it doesn't re-render props on change
const defaultProps: SearchbarProps = {
  placeholder: 'サーチ。。'
}

const Searchbar = (props: SearchbarProps) => {
  props = { ...defaultProps, ...props }

  return (
    <div className={styles.container}>
      <SearchIcon />
      <input type="search" autoComplete="off" placeholder={props.placeholder} onChange={props.onChange} />
    </div>
  )
}

export default Searchbar
