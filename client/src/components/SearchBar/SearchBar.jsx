import './SearchBar.module.scss'

const SearchBar = (props) => {
  return (
    <input
      type="search"
      autoComplete="off"
      placeholder="サーチ 。。"
      onChange={props.onChange}
    />
  )
}

export default SearchBar
