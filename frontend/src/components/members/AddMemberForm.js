import { useState } from 'react';
import { useMembersContext } from '../../hooks/useMembersContext'

const AddMemberForm = () => {
    const { dispatch } = useMembersContext()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault()

    const member = { firstName, lastName, email }

    const response = await fetch('/api/members', {
        method: 'POST',
        body: JSON.stringify(member),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
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
      dispatch({ type: 'CREATE_MEMBER', payload: json });
    }
  }
  
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Member</h3>

          <label>First Name*</label>
          <input 
            type="text"
            onChange={(e) => setFirstName(e.target.value)} 
            value={firstName} 
            className={emptyFields.includes('firstName') ? 'error' : ''}
          />

          <label>Last Name*</label>
          <input 
            type="text"
            onChange={(e) => setLastName(e.target.value)} 
            value={lastName} 
            className={emptyFields.includes('lastName') ? 'error' : ''} 
          />
          
        <label>Email Address*</label>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          className={emptyFields.includes('email') ? 'error' : ''} 
        />
      <button>Add Member</button>

      {error && <div className ="error">{error}</div>}
    </form>
  )
    
}

export default AddMemberForm