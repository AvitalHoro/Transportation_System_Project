import React from "react";
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// , שם משתמש, סיסמה, טלפון , מייל.

const AddDriver = () => {
    return (

        <div className="page-add-driver-container">
        <div className="add-driver-container">
               <div style={{
                color: "#00bf63",
                fontWeight: "bold",
                fontSize: "1.5em",
            }}>הוסף נהג</div>
                    <TextField
          required
          id="outlined-required"
          label="שם משתמש"
        />
           <TextField
          id="outlined-password-input"
          label="סיסמה ראשונית"
          type="password"
          autoComplete="current-password"
        />
          <TextField
          required
          id="outlined-required"
          label="טלפון"
        />
            <TextField
            required
            id="outlined-required"
            label="מייל"
            />

<button className="add-stop-button"
                        style={{ marginTop: "0"
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