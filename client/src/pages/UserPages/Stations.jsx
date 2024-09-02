import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const Stations = ({ registerId, defaultToStation, defaultFromStation, RideStations, isRegister, setToStation, setFromStation }) => {

    function getIdByName(name) {
        const station = RideStations.find(station => station.name === name);
        return station ? station.id : null; // Return the id if found, otherwise return null
    }

    const handleSetStation = async (station, type) => {

        if (isRegister) {
            if (type === "from") {

                if (station === defaultTo) {
                    alert("לא ניתן לעלות ולרדת באותה תחנה");
                    return;
                }
                setFromStation(station);
            } else {
                if (station === defaultFrom) {
                    alert("לא ניתן לעלות ולרדת באותה תחנה");
                    return;
                }
                setToStation(station);
            }
            return;
        }
        const newStationId = getIdByName(station);

        let typeStation = '';

        if (type === "from") {
 if (station === defaultTo) {
                    alert("לא ניתן לעלות ולרדת באותה תחנה");
                    return;
                }
            //type = 'PickupStationID'
            //wait for server
            //replace the station id in the register, use newStationId

            typeStation = 'PickupStationID';
        }
        else {
            if (station === defaultFrom) {
                alert("לא ניתן לעלות ולרדת באותה תחנה");
                return;
            }
            typeStation = 'DropoffStationID';
        }

            try {
                const response = await fetch(`${api}/registrations/update/station/${registerId}/${newStationId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include your auth token if required
                    },
                    body: JSON.stringify({
                        typeStation: typeStation // Include the typeStation in the body
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.message === 'The station updated successfully') {
                    if (type === "from") {
                        console.log("From station:", station);
                        setDefaultFrom(station);
                    } else {
                        console.log("To station:", station);
                        setDefaultTo(station);
                    }
                    return data.message;
                } else {
                    console.error('Request failed:', data.message);
                    return null;
                }

            } catch (error) {
                console.error('Error during request your ride: ', error);
                return null;
            }
    }

    const [defaultFrom, setDefaultFrom] = useState(defaultFromStation);
    const [defaultTo, setDefaultTo] = useState(defaultToStation);

    const fromStations = RideStations.filter(station => station.type !== "Destination").map(station => station.name);
    const toStations = RideStations.filter(station => station.type !== "Starting").map(station => station.name);

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: "15px",
            marginBottom: "5px"
        }}>

            <Autocomplete
                value={defaultFrom}
                disablePortal
                disableClearable
                id="combo-box-drop-station"
                options={fromStations}
                onChange={(event, newValue) => {
                    setDefaultFrom(newValue);
                    handleSetStation(newValue, "from");
                }}
                sx={{
                    width: "46%",
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '40px',
                        height: '45px',
                    },
                    '& .MuiFormLabel-root': {
                        lineHeight: '0.8',
                    },
                }}
                renderInput={(params) => <TextField {...params} label="תחנת עלייה" />}
            />
            <ArrowCircleLeftIcon style={{
                color: "#A6A6A6",
                fontSize: "200%",
                margin: "-5px",
                zIndex: 100
            }} />

            <Autocomplete
                value={defaultTo}
                disablePortal
                disableClearable
                id="combo-box-drop-station"
                options={toStations}
                onChange={(event, newValue) => {
                    setDefaultTo(newValue);
                    handleSetStation(newValue, "to");
                }
                }
                sx={{
                    width: "46%",
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '40px',
                        height: '45px',
                    },
                    '& .MuiFormLabel-root': {
                        lineHeight: '0.8',
                    },
                }}
                renderInput={(params) => <TextField {...params} label="תחנת ירידה" />}
            />
        </div>
    )
}

export default Stations;