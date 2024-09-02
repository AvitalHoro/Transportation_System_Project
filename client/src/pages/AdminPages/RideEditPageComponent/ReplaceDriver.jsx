import React, {useEffect} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const ReplaceDriver = ({ driverName, rideId, isInPopUp, setDriverUpdate }) => {

    const [driversListWithId, setDriversListWithId] = React.useState(null);
    const [driversList, setDriversList] = React.useState(null);

    const getAllDrivers = async () => {
                        //return all user with driver permission

        try {
            const response = await fetch(`${api}/users/getUsers/Driver`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.users) {
                console.log('The drivers:', data.users);
                setDriversListWithId(data.users.map(user => ({
                    name: user.Username,
                    id: user.userID
                })));
                setDriversList(data.users.map(user => user.Username));

            } else {
                console.error('Request failed:', data.message);
                return null; 
            }
    
        } catch (error) {
            console.error('Error during request drivers:', error);
            return null;
        }


        //wait for server
        //return all user with driver permission
        // return [
        //     {
        //         name: "אבי רבינוביץ'",
        //         id: 78,
        //     },
        //     {
        //         name: "שמחה מוצים",
        //         id: 79,
        //     },
        //     {
        //         name: "אבי רון",
        //         id: 80,
        //     },
        //     {
        //         name: "עמית נקש",
        //         id: 81,
        //     }

        // ]
    }

    const handleReplaceDriver = async (driverName) => {

        const newDriver = driversListWithId.find(d => d.name === driverName).id;

        if (newDriver === undefined) {
            alert("נהג לא תקין");
            return;
        }

        //wait for server
        //send rideId and driverId
        try {
            const response = await fetch(`${api}/transportations/replaceDriver/${rideId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newDriver }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();

            if (data.message === 'Driver replaced successfully') {
                setDriverUpdate(driverName);
                console.log("Replace driver: ", rideId, newDriver);
                alert("הנהג הוחלף בהצלחה");
                return data.message; 
            } else {
                console.error('Request failed:', data.message);
                return null; 
            }
    
        } catch (error) {
            console.error('Error during request:', error);
            return null;
        }
    }

    useEffect(() => {
        getAllDrivers();
    }, []);

    // const driversListWithId = getAllDrivers()
    // const driversList = driversListWithId.map(d => d.name);

    return (
        <div className="replace-drive-container" style={{ width: isInPopUp ? "100%" : "" }}>
        {driversList? (
        <div>

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
        ) : <div>loading...</div>}
        </div>
    )
}

export default ReplaceDriver;