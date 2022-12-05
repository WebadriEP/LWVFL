import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import DonationDetails from '../components/donations/DonationDetails';
import { useDonationContext } from '../hooks/useDonationContext';

// css
import '../components/donors/donorStyles.css'

const Donations = () => {
    const { donations, dispatch } = useDonationContext();

    useEffect(() => {
        const fetchDonations = async () => {
          const response = await fetch('http://localhost:3000/api/donations')
          const json = await response.json(); 
  
          if (response.ok) {
              dispatch({ type: 'SET_DONATIONS', payload: json })
          }
      };
        fetchDonations();
      }, [dispatch]);

      return (
        <div>
          <div>
            <h2>Donations</h2>
           
          </div>
          
          <div className="member-list">
            {donations && donations.map((donation) => (
              <DonationDetails key={donation._id} donation={donation} />
            ))}
            
            <Link to="/donations/add" float="right">
              <button className="btnAdd" float="right">New Donation</button>
            </Link>
          </div>

        </div>
      )
}

export default Donations;