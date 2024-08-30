import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ReplaceDriver = () => {

    const getAllDrivers = () => { 
        return [
            "נהג 1",
            "נהג 2",
            "נהג 3",
            "נהג 4",
            "נהג 5",
            "נהג 6",
            "נהג 7",
            "נהג 8",
            "נהג 9",
        ]
    }

    const driversList = getAllDrivers();

    return (
        <div className="replace-drive-container">
            <span style={{fontSize: "18px", fontWeight: '700', color: "#CB6CE6"}}>החלף נהג</span>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', borderRadius:'50px', padding: '2px 5px 2px 5px', marginTop: '5px'}}>
                <img src="../../icons/change-driver.png" style={{width: '45px', height: '45px'}}></img>
            <Autocomplete
          id="disable-clearable"
          sx={{
                width: '80%',
                height: '60px',
                marginRight: '10px',
            marginLeft: '10px',
                '& .MuiInputBase-root': {
                    backgroundColor: 'transparent'
                }
          }}    
          options={driversList}  // Correctly passing the drivers list as options
          disableClearable
          renderInput={(params) => (
            <TextField {...params} label="בחר נהג" variant="standard" />
          )}
        />
            </div>
        </div>
    )
}

export default ReplaceDriver;