import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


const Stations = ({ rideId, defaultToStation, defaultFromStation }) => {

    const getFromStations = (rideId) => {
        return [
            "מרכזית בית שאן",
            "מרכזית בית שמש",
            "מרכזית בית יהושע",
            "מרכזית בית קמה",
            "מרכזית בית שקמה",
            "מרכזית ביתר עילית",
            "ארלוזורוב תל אביב",
            "ארסוף",
            "אשדוד עד הלום",]
    }

    const getToStations = (rideId) => {
        return [
            "מרכזית בית שאן",
            "מרכזית בית שמש",
            "מרכזית בית יהושע",
            "מרכזית בית קמה",
            "מרכזית בית שקמה",
            "מרכזית ביתר עילית",
            "ארלוזורוב תל אביב",
            "ארסוף",
            "אשדוד עד הלום",
        ]
    }

    const [defaultFrom, setDefaultFrom] = useState(defaultFromStation);
    const [defaultTo, setDefaultTo] = useState(defaultToStation);

    const fromStations = getFromStations(rideId);
    const toStations = getToStations(rideId);

    const myFromStation = fromStations[0];
    const myToStation = toStations[0];

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
                options={toStations}
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
                sx={{
                    width: "46%",
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '40px',
                        height: '45px',
                    },
                    '& .MuiFormLabel-root': {
                        lineHeight: '0.8',
                    }
                }}
                renderInput={(params) => <TextField {...params} label="תחנת ירידה" />}
            />
        </div>
    )
}

export default Stations;