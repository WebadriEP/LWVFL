import {useState} from 'react';

import {useAuthContext} from '../../hooks/useAuthContext';


const LoginFields = () => {
    const {dispatch} = useAuthContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)

    const login = async(email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
           
        })
        const json = await response.json()
    

    if(!response.ok){
        setIsLoading(false)
        setError(json.error)
    }
    if(response.ok){
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type: "LOGIN", payload:json})

        setIsLoading(false)
    }
}



    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <div>
                <h1>Log In</h1>

                <label>Email address</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                <button disabled={isLoading}>Log in</button>


            </div>


        </form>
    )
}

export default LoginFields;