// css
import './searchStyles.css'
import React from 'react';

const Search = ({ donors, setQueryResults }) => {

  // Prevent form from refreshing page
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // Handles changes to input field
  const handleQueryChange = (e) => {
    
    // Get the query from the input field
    let query = e.target.value.toLowerCase(); 

    // Default case: If no query, return all members 
    if (!query) return setQueryResults(donors); 

    // Filtered case: Check first name, last name, and email address for the query
    const queryArray = donors.filter(donor => donor.firstName.toLowerCase().includes(query) || 
                        donor.lastName.toLowerCase().includes(query) || 
                        donor.email.toLowerCase().includes(query));

    setQueryResults(queryArray); // Update state
  }

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input type='text' placeholder='Search by name or email...' onChange={handleQueryChange} />
    </form>
  )
}

export default Search