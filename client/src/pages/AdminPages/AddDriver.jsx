import React from "react";
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { request } from "../../requests";

// , שם משתמש, סיסמה, טלפון , מייל.

const AddDriver = () => {

    const handleAddDriver = async () => {
        // check if all fields are filled
        if(username==="" || password==="" || phone==="" || email===""){
            alert("אנא מלא את כל השדות");
            return;
        }
        if(!email.includes("@")){
            alert("מייל לא תקין");
            return;
        }
        if(password.length<6) {
            alert("סיסמה חייבת להכיל לפחות 6 תווים");
            return;
        }

        // wait for server
    try {
        const token = localStorage.getItem('token'); 
        const permission = 'driver'
        const response = await request('POST', '/users/register', token, { username, password, phone, permission, email });

        if (response.error) {
            console.error('add driver failed:', response.message);
        } else {
            console.log("Add driver: ", username, password, phone, email);
            alert(`הנהג ${username} נוסף בהצלחה`);
            setUsername("");
            setPassword("");
            setPhone("");
            setEmail("");
        }
    } catch (err) {
        console.error('Error occurred while add the ride:', err);
    }
}


    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");


    return (

        <div className="page-add-driver-container">
            <div className="add-driver-container">
                <div style={{
                    color: "#00bf63",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                }}>הוסף נהג</div>
                <TextField
                    value={username}
                    required
                    id="outlined-required"
                    label="שם משתמש"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    value={password}
                    id="outlined-password-input"
                    label="סיסמה ראשונית"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    value={phone}
                    required
                    id="outlined-required"
                    label="טלפון"
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    value={email}
                    required
                    id="outlined-required"
                    label="מייל"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="add-stop-button"
                    onClick={handleAddDriver}
                    style={{
                        marginTop: "0"
                    }}>
                    הוסף נהג
                    <AddCircleIcon sx={{
                        color: '#00bf63',
                        fontSize: '1.5em',
                    }} />
                </button>


            </div>
        </div>
    )
}

export default AddDriver;