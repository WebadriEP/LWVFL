import { useState } from 'react'

// css
import './searchStyle.css'

const Search = (props) => {
  let placeholderText = 'Search ' + props.searchType + '...'

  const [members, setMembers] = useState([])

  return (
    <div className='search'>
      <input type='search' placeholder={placeholderText} />
    </div>
  )
}

export default Search