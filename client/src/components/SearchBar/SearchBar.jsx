import './SearchBar.module.scss'

const SearchBar = (props) => {
  return (
    <input
      type="search"
      id="search"
      autoComplete="off"
      placeholder="サーチ 。。"
      maxLength="10"
      onChange={props.onChange}
    />
  )
}

export default SearchBar
