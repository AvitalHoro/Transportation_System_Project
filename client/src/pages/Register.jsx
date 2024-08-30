import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { register } from "../requests";

//Uname, Username, UserPassword, UserPhone, UserEmail
const Register = () => {

    const handleRegister = async () => {

        if(password !== verifyPassword){
            console.error('Passwords do not match');
            alert('הסיסמה אינה תואמת לאימות');
            return;
        }
        if( !username || !password || !verifyPassword || !phone || !email) {
            console.error('All fields are required');
            alert('כל השדות הינם חובה');
            return;
        }
        console.log('Registering with:', username, password, verifyPassword, phone, email);
        const result = await register(username, password, phone, 'user' ,email);

        if (result) {
            console.log('User registered successfully:', result);
            window.location.replace('/login');
            alert('ההרשמה בוצעה בהצלחה, כעת ניתן להתחבר');
        } else {
            console.error('Registration failed');
            alert('ההרשמה נכשלה. נסה שנית או פנה לתמיכה');
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="login-container">
            <h2>הירשם</h2>
            <TextField
                id='username'
                label="שם משתמש"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <TextField
                id='password'
                label="סיסמה"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <TextField
                id='verifyPassword'
                label="אימות סיסמה"
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                required
            />
            <TextField
                id='phone'
                label="טלפון"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <TextField
                id='email'
                label="אימייל"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />


            <Button variant="outlined" onClick={handleRegister}>הירשם</Button>
            <div className="register-link">
                משתמש רשום?          <a href="/login">התחבר</a>
            </div>
        </div>
    )
}

export default Register;