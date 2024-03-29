import axios from 'axios';
import React from 'react';


import { useParams, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react'

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [admin, setAdmin] = useState();


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/api/users/get/" + id)
        .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setCity(response.data.city);
        setPhone(response.data.phone);
        setAdmin(response.data.admin);
        })
    }, [])
        
    
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const updatedUser = {
            firstName,
            lastName,
            email,
            address,
            city,
            phone,
            admin,
        };

        axios.put(process.env.REACT_APP_BACKEND_URL+'/api/users/update/'+ id, updatedUser)
        .then((response) => {
            console.log(response.data);
            navigate('/users'); // Navigate to the users page after successful update
        })
        .catch((error) => {
            console.error(error);
        });
      }
return (
        <div className="createAccount-fields-item">
                <form className="create" onSubmit={handleUpdate}>
                <h1 style={{fontSize: "30px"}}>Update User</h1>
                <div className="fields" style={{paddingTop: "20px", marginBottom: "20px"}}>
                    <label>First Name</label>
                    <input
                        type="text"
                        value= {firstName}
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
                    <label style={{paddingTop: "20px"}}>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}   
                    />
                    <label style={{paddingTop: "20px"}} >City</label>
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
                <button>Update User</button>
                </form>
            </div>
      )
    }


