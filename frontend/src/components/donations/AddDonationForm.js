import { useState } from 'react';
import { useDonationContext } from '../../hooks/useDonationContext';
import React from 'react';

const AddDonationForm = () => {
    
    const { dispatch } = useDonationContext(); // Allow access to manage donors
    const [donorID, setdonorID] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [notes, setNotes] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    // Logic for add button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit

    const donation = {
      
      donorID,
      amount,
      date,
      type,
      notes

    }

    const response = await fetch('http://localhost:3000/api/donations/', {
        method: 'POST',
        body: JSON.stringify(donation),
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
      setdonorID('')
      setAmount('')
      setDate('')
      setType('')
      setNotes('')
      
      dispatch({ type: 'ADD_DONOR', payload: json });
    }

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Donation</h2>

        
        <div>
          <div>
            <label>ID of Donor*</label>
            <input 
              type="text"
              value={donorID} 
              onChange={(e) => setdonorID(e.target.value)} 
              className={emptyFields.includes('donorID') ? 'error' : ''}
            />
          </div>
          <div>
            <label>Amount*</label>
            <input 
              type="number"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className={emptyFields.includes('amount') ? 'error' : ''} 
            />
          </div>
        </div>

        
        <div className="form-email">
          <label>Email Address*</label>
          <input 
            type="date"
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className={emptyFields.includes('date') ? 'error' : ''} 
          />
        </div>
        
        <button>Add Donation</button>


      
      </form>
    </div>
  )




    
}

export default AddDonationForm