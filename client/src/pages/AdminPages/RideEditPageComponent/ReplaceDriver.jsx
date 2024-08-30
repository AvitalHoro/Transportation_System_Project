import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ReplaceDriver = ({ driverName, rideId, isInPopUp }) => {

    const getAllDrivers = () => {
        //wait for server
        //return all user with driver permission
        return [
            {
                name: "אבי רבינוביץ'",
                id: 78,
            },
            {
                name: "שמחה מוצים",
                id: 79,
            },
            {
                name: "אבי רון",
                id: 80,
            },
            {
                name: "עמית נקש",
                id: 81,
            }

        ]
    }

    const handleReplaceDriver = (driverName) => {

        const driverId = driversListWithId.find(d => d.name === driverName).id;

        if (driverId === undefined) {
            alert("נהג לא תקין");
            return;
        }

        //wait for server
        //send rideId and driverId

        console.log("Replace driver: ", rideId, driverId);
        alert("הנהג הוחלף בהצלחה");
    }

    const driversListWithId = getAllDrivers()
    const driversList = driversListWithId.map(d => d.name);

    return (
        <div className="replace-drive-container" style={{ width: isInPopUp ? "100%" : "" }}>
            <span style={{ fontSize: "18px", fontWeight: '700', color: "#CB6CE6" }}>החלף נהג</span>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', borderRadius: '50px', padding: '2px 5px 2px 5px', marginTop: '5px' }}>
                <img src="../../icons/change-driver.png" style={{ width: '45px', height: '45px' }}></img>
                <Autocomplete
                    id="disable-clearable"
                    onChange={(event, newValue) => {
                        handleReplaceDriver(newValue);
                    }}
                    defaultValue={driverName}
                    sx={{
                        width: '80%',
                        height: '60px',
                        marginRight: '10px',
                        marginLeft: '10px',
                        '& .MuiInputBase-root': {
                            backgroundColor: 'transparent'
                        }
                    }}
                    options={driversList}
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