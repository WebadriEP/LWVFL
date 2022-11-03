import {useState} from 'react';

import { useLogin } from '../../hooks/useLogin';

const LoginFields = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    


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