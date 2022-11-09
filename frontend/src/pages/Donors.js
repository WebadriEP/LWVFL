import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import DonorDetails from '../components/donors/DonorDetails';
import { useDonorContext } from '../hooks/useDonorContext';

// css
import '../components/donors/donorStyles.css'

const Donors = () => {
    const { donors, dispatch } = useDonorContext();

    useEffect(() => {
        const fetchDonors = async () => {
          const response = await fetch('http://localhost:3000/api/donors')
          const json = await response.json(); 
  
          if (response.ok) {
              dispatch({ type: 'SET_DONORS', payload: json })
          }
      };
        fetchDonors();
      }, [dispatch]);

      return (
        <div>
          <div>
            <h2>Manage Donors</h2>
           
          </div>
          
          <div className="member-list">
            {donors && donors.map((donor) => (
              <DonorDetails key={donor._id} donor={donor} />
            ))}
            
            <Link to="/donors/add" float="right">
              <button className="btnAdd" float="right">Add Donor</button>
            </Link>
          </div>

        </div>
      )
}

export default Donors;