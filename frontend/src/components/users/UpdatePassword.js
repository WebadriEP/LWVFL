import axios from 'axios';
import React from 'react';


import { useParams, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react'

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');

    

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedUser = {
            password
        };

        axios.put(process.env.REACT_APP_BACKEND_URL+'/api/users/update/password/' + id, updatedUser)
        
        .then((response) => {
            console.log(response)
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
                    <label>New Password</label>
                    <input
                        type="password"
                        value= {password}
                        onChange={(e) => setPassword(e.target.value)}   
                    />
                </div>
                <button>Update Password</button>
                </form>
            </div>
      )
    }


