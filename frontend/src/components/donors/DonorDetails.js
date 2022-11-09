import { useDonorContext } from "../../hooks/useDonorContext";
import './donorStyles.css';


const DonorDetails = ({ donor }) => {
  const { dispatch } = useDonorContext(); // Allow access to manage donors

  
  

  return (
    // Basic details component. Will build a more complex design later.
    <div className="donor-item">
      <h4>{donor.firstName} {donor.lastName}</h4>
      <p><strong>Email:</strong> {donor.email}</p>
      <button>View Donations for Donor</button>
      
      
    </div>
  )
}

export default DonorDetails;