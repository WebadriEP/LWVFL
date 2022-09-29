
import './createAccount.css'
import {useState} from 'react';
import { useUsersContext } from '../../Hooks/useUserContext';
import { useUsersContext } from '../../Hooks/useUserContext'; 

const createAccountFields = () => {
    const {dispatch} = useUserContext()

    const  [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error,setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async(e) => {
        e.preventDefault();

     const user ={   
        firstName,
        lastName,
        email,
        password
    }

    const response = await fetch('/api/Create_Account', {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application.json',
            'Authorization': 'Bearer $(user.token)'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setEmptyFields([])
        setError(null)
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')

    }
}


    return (
        <div className="createAccount-fields-item">
            <form className="create" onSubmit={handleSubmit}></form>
            <h2>Add a new User</h2>
            <div className="fields">
                <label>First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}   
                    className = {emptyFields.includes('firstName') ? 'error' : ''}             
                />
                 <label>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}   
                    className = {emptyFields.includes('lastName') ? 'error' : ''}             
                />
                 <label>E-Mail</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}   
                    className = {emptyFields.includes('email') ? 'error' : ''}             
                />
                 <label>Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}   
                    className = {emptyFields.includes('password') ? 'error' : ''}             
                />
            </div>
            <button>Create User</button>
        </div>
    )
}

export default createAccountFields;