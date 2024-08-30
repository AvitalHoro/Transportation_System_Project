import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login } from "../requests";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  async () => {
    {

      if( !username || !password) {
        console.error('All fields are required');
        alert('כל השדות הינם חובה');
        return;
      }

      console.log('Logging in with:', username, password);
      const result = await login(username, password);

      if (result) {
        console.log('Logged in successfully:', result);
        window.location.replace('/home');
      } else {
        console.error('Login failed');
        alert('ההתחברות נכשלה. נסה שנית או פנה לתמיכה');
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