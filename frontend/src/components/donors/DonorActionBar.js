// components
import React from 'react';

import Search from "../search/DonorSearch";
import PrimaryButton from "../buttons/PrimaryButton"

// css
//import '../members/memberStyles.css'
import '../buttons/buttonStyles.css'

const DonorActionBar = ({ donors, setQueryResults }) => {
  return (
    <div>
      <Search donors={donors} setQueryResults={setQueryResults} />
      
      {/* NEW MEMBER BUTTON */}
      <button className="btn-action">+</button>
    </div>
  )
}

export default DonorActionBar