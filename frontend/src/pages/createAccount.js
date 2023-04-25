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
    const [admin, setAdmin] = useState(false);
    const { register, error, loading } = useRegister();


  const handleRegister = async (e) => {
    e.preventDefault();
    await register(firstName, lastName, email, password, address, city, phone, admin);
    navigate('/users'); // Navigate to the users page after successful update

  }

  return (
    <div className="createAccount-fields-item">
            <form className="create" onSubmit={handleRegister}>
            <h1 style={{fontSize: "30px"}}>Add a new User</h1>
            <div className="fields" style={{paddingTop: "20px", marginBottom: "20px"}}>
                <label style={{paddingTop: "20px"}}>First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}   
                />
                 <label style={{paddingTop: "20px"}}>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}   
                />
                 <label style={{paddingTop: "20px"}}>E-Mail</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}   
                />
                 <label style={{paddingTop: "20px"}}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}   
                />
                <label style={{paddingTop: "20px"}}>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}   
                    />
                    <label style={{paddingTop: "20px"}}>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}   
                    />
                    <label style={{paddingTop: "20px"}}>Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}   
                    />
                    <label style={{paddingTop: "20px"}}>Admin?(Yes or No)</label>
                    <select 
                        value={admin}
                        onChange={(e) => setAdmin(e.target.value)} >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>    
            </div>
            <button >Create User</button>
            </form>
        </div>
  )
}

export default Register