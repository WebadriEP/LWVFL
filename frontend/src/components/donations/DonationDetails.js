import { useDonationContext } from "../../hooks/useDonationContext";
import React from 'react';

//import './donorStyles.css';


const DonationDetails = ({ donation }) => {
  const { dispatch } = useDonationContext(); // Allow access to manage donors

  
  

  return (
    // Basic details component. Will build a more complex design later.
    <div className="donor-item">
      <h4>Donor: {donation.donorID}</h4>
      <p>Donation Amount: {donation.amount}</p>
     
      
      
    </div>
  )
}

export default DonationDetails;