import React from 'react';

// components
import { useState } from 'react'
import { useRegister } from '../hooks/useRegister';

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, loading } = useRegister();


  const handleRegister = async (e) => {
    e.preventDefault();
    await register(firstName, lastName, email, password);
  }

  return (
    <div className="createAccount-fields-item">
            <form className="create" onSubmit={handleRegister}>
            <h2>Add a new User</h2>
            <div className="fields">
                <label>First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}   
                />
                 <label>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}   
                />
                 <label>E-Mail</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}   
                />
                 <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}   
                />
            </div>
            <button>Create User</button>
            </form>
        </div>
  )
}

export default Register