import { useDonorContext } from "../../hooks/useDonorContext";


const DonorDetails = ({ donor }) => {
  const { dispatch } = useDonorContext(); // Allow access to manage donors

  
  

  return (
    // Basic details component. Will build a more complex design later.
    <div>
      <h4>{donor.firstName} {donor.lastName}</h4>
      <p><strong>Email:</strong> {donor.email}</p>
      
      
    </div>
  )
}

export default DonorDetails;