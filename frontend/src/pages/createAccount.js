import React from 'react';

// components
import { useState } from 'react'
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const { register, error, loading } = useRegister();


  const handleRegister = async (e) => {
    e.preventDefault();
    await register(firstName, lastName, email, password, address, city, phone);
    navigate('/users'); // Navigate to the users page after successful update

  }

  return (
    <div className="createAccount-fields-item">
            <form className="create" onSubmit={handleRegister}>
            <h1 style={{fontSize: "30px"}}>Add a new User</h1>
            <div className="fields" style={{paddingTop: "20px", marginBottom: "20px"}}>
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
                <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}   
                    />
                    <label>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}   
                    />
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}   
                    />
            </div>
            <button >Create User</button>
            </form>
        </div>
  )
}

export default Register