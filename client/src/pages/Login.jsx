import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login } from "../requests";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  async () => {
    {
      console.log('Logging in with:', username, password);
      const result = await login(username, password);

      if (result) {
        console.log('Logged in successfully:', result);
        // Handle the successful login (e.g., save the token, redirect the user)
      } else {
        console.error('Login failed');
        // Handle the failed login (e.g., show an error message to the user)
      }
    }
  }



    return (
      <div className="login-container">
        <h2>התחבר</h2>
        <TextField
          id='username'
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          id='password'
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="outlined" onClick={handleLogin}>התחבר</Button>
        <div className="register-link">
          עדיין אין לך משתמש?
          <a href="/register">הירשם</a>
        </div>
      </div>
    )
  }

  export default Login;