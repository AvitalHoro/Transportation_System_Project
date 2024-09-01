import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddStationPopUp from "./RideEditPageComponent/AddStationPopUp";
import { request } from "../../requests";


const ResponsiveTimePickers = ({timeValue, setTimeValue}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'TimePicker',
                    'MobileTimePicker',
                    'DesktopTimePicker',
                    'StaticTimePicker',
                ]}
            >
                <DemoItem>
                    <TimePicker
                        value={timeValue}
                        onChange={(time) => {setTimeValue(time); 
                        console.log(time)}
                        }
                        sx={{
                            borderRadius: '40px',
                            '& .MuiInputBase-root': {
                                borderRadius: '40px',
                                height: '45px',
                                overflow: 'hidden',
                            },
                            '& .MuiButtonBase-root:focus-visible': {
                                outline: 'none',
                            },
                            '& .MuiButtonBase-root:focus': {
                                outline: 'none',
                            },
                        }}
                        defaultValue={dayjs()} />
                </DemoItem>

            </DemoContainer>
        </LocalizationProvider>
    );
}


const ResponsiveDatePickers = ({dateValue, setDateValue}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DatePicker',
                    'MobileDatePicker',
                    'DesktopDatePicker',
                    'StaticDatePicker',
                ]}
            >

                <DemoItem>
                    <DatePicker
                    value={dateValue}
                        onChange={(date) => {setDateValue(date);
                        console.log(date)}}
                        id="date-picker-inline"
                        sx={{
                            borderRadius: '40px',
                            '& .MuiInputBase-root': {
                                borderRadius: '40px',
                                height: '45px',
                                overflow: 'hidden',

                            },
                            '& .MuiButtonBase-root:focus-visible': {
                                outline: 'none',
                            },
                            '& .MuiButtonBase-root:focus': {
                                outline: 'none',
                            },
                        }} defaultValue={dayjs()} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

const AddRide = async () => {
    const token = localStorage.getItem('token');
    
    const getStationsList = async () => {
        try {
            const stationsData = await request('GET', '/stations/all', token);
        
            if (stationsData.error) {
                throw new Error(stationsData.error);
            }
    
            // Map the stations to the desired format
            const formattedStations = stationsData.stations.map(station => ({
                name: `${station.Address}, ${station.City}`,
                id: station.StationID
            }));
        
            return formattedStations;
        
        } catch (error) {
            console.error('Error fetching stations:', error);
            return [];
        }
    }

    const getAllDrivers = async () => {
        try {
            const driversData = await request('GET', `/users/getUsers/Driver`, token);
        
            if (driversData.error) {
                throw new Error(stationsData.error);
            }
    
            // Map the stations to the desired format
            const formattedDrivers = driversData.users.map(driver => ({
                name: driver.Username,
                id: driver.userID
            }));
        
            return formattedDrivers;
        
        } catch (error) {
            console.error('Error fetching stations:', error);
            return [];
        }
    }

    const handleAddRide = async () => {
        if(fromStation === "" || toStation === "" || dateValue === null || timeValue === null || driver === ""){
            alert("אנא מלא את כל השדות");
            return;
        }

        if(dateValue < dayjs() || (dateValue === dayjs() && timeValue < dayjs())){
            alert("אין אפשרות ליצור נסיעה בתאריך שעבר");
            return;
        }

        const driverId = driversListWithId.find(d => d.name === driver).id;

        if(driverId === undefined){
            alert("נהג לא קיים");
            return;
        }

        //wait for server
        try {
            const body = { transportationDate: dateValue, 
                           transportationTime: timeValue, 
                           transportationStatus: 'active', 
                           driver: driverId, 
                           maxPassengers: 50 
                        }

            const insertTransportation = await postRequest('/transportations/add', token, body);
        
            if (insertTransportation.error) {
                throw new Error(stationsData.error);
            }
    
            const newTransportationId = insertTransportation.transportationId;
                
        } catch (error) {
            console.error('Error add insertTransportation:', error);
            return null;
        }

        //add the ride to the database - don't forget new id

        const selectedStationIds = stopsList.map(selectedName => {
            const station = stationsListWithId.find(station => station.name === selectedName);
            return station ? station.id : null;
        }).filter(id => id !== null); 
        //wait for server
        selectedStationIds.forEach(id => {/* Add the stations to the ride with "intermidate" type*/});

        const fromStationId = stationsListWithId.find(station => station.name === fromStation).id;
        const toStationId = stationsListWithId.find(station => station.name === toStation).id;
        //wait for server
        //add the fromStation and toStation to the ride with "starting" and "destination" type

        console.log("added ride");
    }

    const stationsListWithId = await getStationsList();
    console.log(stationsListWithId)
    const stationsList = stationsListWithId.map(sat => sat.name);
    const driversListWithId = await getAllDrivers()
    console.log(driversListWithId)
    const driversList = driversListWithId.map(d => d.name);
    console.log(driversList)

    const [stopsList, setStopsList] = React.useState([]);

    const [fromStation, setFromStation] = React.useState("");
    const [toStation, setToStation] = React.useState("");
    const [dateValue, setDateValue] = React.useState(null);
    const [timeValue, setTimeValue] = React.useState(null);
    const [driver, setDriver] = React.useState("");

    const [openPopUpStation, setOpenPopUpStation] = React.useState(false);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            paddingTop: "30px",
            boxSizing: "border-box",
        }}>
            {openPopUpStation? <AddStationPopUp setOpenPopUpStation={setOpenPopUpStation} stationsList={stationsList} setStopsList={setStopsList} />: null}
            <div style={{
                color: "#00bf63",
                fontWeight: "bold",
                fontSize: "1.5em",
            }}>הוסף נסיעה</div>
            <div className="add-ride-container">

                <div style={{ marginTop: "8px" }}>
                    <Autocomplete
                    value={fromStation}
                    onChange={(event, newValue) => {
                        setFromStation(newValue);
                        console.log(newValue);
                    }}
                        disablePortal
                        disableClearable
                        id="combo-box-drop-station"
                        options={stationsList}
                        sx={{
                            minWidth: '200px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '40px',
                                height: '45px',

                            },
                            '& .MuiFormLabel-root': {
                                lineHeight: '0.8',
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="תחנת מוצא" />}
                    />
                </div>

                <div style={{ marginTop: "8px" }}>
                    <Autocomplete
                    value={toStation}
                    onChange={(event, newValue) => {
                        setToStation(newValue);
                        console.log(newValue);
                    }}
                        disablePortal
                        disableClearable
                        id="combo-box-drop-station"
                        options={stationsList}
                        sx={{
                            minWidth: '200px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '40px',
                                height: '45px',

                            },
                            '& .MuiFormLabel-root': {
                                lineHeight: '0.8',
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="תחנת יעד" />}
                    />
                </div>
                <ResponsiveDatePickers dateValue={dateValue} setDateValue={setDateValue}/>
                <ResponsiveTimePickers timeValue={timeValue} setTimeValue={setTimeValue}/>
                <Autocomplete
                    value={driver}
                    onChange={(event, newValue) => {
                        setDriver(newValue);
                        console.log(newValue);
                    }}
                    disablePortal
                    disableClearable
                    id="combo-box-drop-station"
                    options={driversList}
                    sx={{
                        minWidth: '200px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '40px',
                            height: '45px',

                        },
                        '& .MuiFormLabel-root': {
                            lineHeight: '0.8',
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label="בחר נהג" />}
                />

            </div>

            <div className="stops-container" style={{ marginTop: "10px", padding: "10px" }}>
                {stopsList.map(stop => <div className="stop">
                    {stop}
                    <CancelIcon 
                    onClick={() => setStopsList(prevStopsList => prevStopsList.filter(s => s !== stop))}
                    sx={{
                        color: "red",
                        fontSize: "180%",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                        '&:hover': {
                            transform: "scale(1.1)", // Slightly grow the icon
                            color: "rgba(255, 0, 0, 0.7)", // Make the color a bit brighter
                        }
                    }} />
                </div>)}
                <div className="add-stop-button-container">
                    <button className="add-stop-button"
                    onClick={() => setOpenPopUpStation(true)}
                        style={{
                            marginTop: "0"
                        }}>
                        הוסף תחנה
                        <AddCircleIcon sx={{
                            color: '#00bf63',
                            fontSize: '1.5em',
                        }} />
                    </button>

                </div>


            </div>
            <button className="add-ride-button"
            onClick={handleAddRide}
                style={{
                    marginTop: "0"
                }}>
                הוסף נסיעה

            </button>
        </div>
    )
}

export default AddRide;

