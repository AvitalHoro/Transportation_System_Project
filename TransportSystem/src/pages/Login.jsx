import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
        <h1>התחברות</h1>
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
        <Button variant="outlined">התחבר</Button>
        </>
    )
}

export default Login;