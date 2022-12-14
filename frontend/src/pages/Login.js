import { useState } from 'react';
import React from 'react';

import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading, success } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={loading}>Log in</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Logged in successfully! You may now navigate to the other pages.</div>}
    </form>
  )
}

export default Login