// css
import './searchStyles.css'

const Search = ({ members, setQueryResults }) => {

  // Prevent form from refreshing page
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // Handles changes to input field
  const handleQueryChange = (e) => {
    
    // Get the query from the input field
    let query = e.target.value.toLowerCase(); 

    // Default case: If no query, return all members 
    if (!query) return setQueryResults(members); 

    // Filtered case: Check first name, last name, and email address for the query
    const queryArray = members.filter(member => member.firstName.toLowerCase().includes(query) || 
                        member.lastName.toLowerCase().includes(query) || 
                        member.email.toLowerCase().includes(query));

    setQueryResults(queryArray); // Update state
  }

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input type='text' placeholder='Search by name or email...' onChange={handleQueryChange} />
    </form>
  )
}

export default Search