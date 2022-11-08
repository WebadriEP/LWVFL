import { useState } from 'react';
import { useDonorContext } from '../../hooks/useDonorContext';

const AddDonorForm = () => {
    
    const { dispatch } = useDonorContext(); // Allow access to manage donors
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    // Logic for add button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit

    const donor = {
      
      firstName,
      lastName,
      email,

    }

    const response = await fetch('http://localhost:3000/api/donors/', {
        method: 'POST',
        body: JSON.stringify(donor),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      const json = await response.json();

    // Error handling
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    // Reset form fields after submission and then add member to global state
    if (response.ok) {
      setEmptyFields([])
      setError(null);
      setFirstName('')
      setLastName('')
      setEmail('')
      
      dispatch({ type: 'ADD_DONOR', payload: json });
    }

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Donor</h2>

        
        <div>
          <div>
            <label>First Name*</label>
            <input 
              type="text"
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className={emptyFields.includes('firstName') ? 'error' : ''}
            />
          </div>
          <div>
            <label>Last Name*</label>
            <input 
              type="text"
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className={emptyFields.includes('lastName') ? 'error' : ''} 
            />
          </div>
        </div>

        {/* EMAIL ADDRESS */}
        <div className="form-email">
          <label>Email Address*</label>
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className={emptyFields.includes('firstName') ? 'error' : ''} 
          />
        </div>
        
        <button>Add Donor</button>


          {error && <div>{error}</div>}
      </form>
    </div>
  )




    
}

export default AddDonorForm