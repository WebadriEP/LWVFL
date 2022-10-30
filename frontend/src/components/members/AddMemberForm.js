import { useState } from 'react';

const AddMemberForm = () => {
    
    const { dispatch } = useMemberContext(); // Allow access to manage members
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    // Logic for add button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit

    const member = {
      
      firstName,
      lastName,
      email,

    }

    const response = await fetch('/api/members', {
        method: 'POST',
        body: JSON.stringify(member),
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
      
      dispatch({ type: 'ADD_MEMBER', payload: json });
    }

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Member</h2>

        
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
        
        <button>Add Member</button>


          {error && <div>{error}</div>}
      </form>
    </div>
  )




    
}

export default AddMemberForm