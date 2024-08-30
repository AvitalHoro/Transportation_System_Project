import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


const Stations = ({ registerId, defaultToStation, defaultFromStation, stationsList, isRegister, setToStation, setFromStation }) => {

    function getIdByName(name) {
        const station = stationsList.find(station => station.name === name);
        return station ? station.id : null; // Return the id if found, otherwise return null
    }

    const handleSetStation = (station, type) => {
        if (isRegister) {
            if (type === "from") {
                setFromStation(station);
            } else {
                setToStation(station);
            }
            return;
        }
        const newStationId = getIdByName(station);
        if (type === "from") {

            //wait for server
            //replace the station id in the register, use newStationId
            console.log("From station:", station);
            setDefaultFrom(station);
        } else {
            //wait for server
            console.log("To station:", station);
            setDefaultTo(station);
        }
    }

    const [defaultFrom, setDefaultFrom] = useState(defaultFromStation);
    const [defaultTo, setDefaultTo] = useState(defaultToStation);

    const fromStations = stationsList.filter(station => station.type !== "Destination").map(station => station.name);
    const toStations = stationsList.filter(station => station.type !== "Starting").map(station => station.name);

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
                value={defaultTo}
                disablePortal
                disableClearable
                id="combo-box-drop-station"
                options={fromStations}
                onChange={(event, newValue) => {
                    setDefaultTo(newValue);
                    handleSetStation(newValue, "to");
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
                value={defaultFrom}
                disablePortal
                disableClearable
                id="combo-box-drop-station"
                options={toStations}
                onChange={(event, newValue) => {
                    setDefaultFrom(newValue);
                    handleSetStation(newValue, "from");
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