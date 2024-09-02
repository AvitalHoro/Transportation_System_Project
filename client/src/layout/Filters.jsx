import React from "react";
import '../style/Layout.css';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMediaQuery } from '@mui/material';
import { request } from '../requests';  


const ResponsiveDatePickers = ({ setFilterDate, dateValue }) => {

    const handleChangeDate = (date) => {
        const thisDate = new Date(date);
        const year = thisDate.getFullYear();
        const month = String(thisDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns 0-11
        const day = String(thisDate.getDate()).padStart(2, '0');

        const formattedDate = `${day}.${month}.${year}`;
        console.log('format-date ',formattedDate);
        setFilterDate(formattedDate);
    }
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
                        onChange={(date) => handleChangeDate(date)}
                        id="date-picker-inline"
                        format="DD/MM/YYYY"
                        sx={{
                            backgroundColor: "#50BB82",
                            color: 'white',
                            borderRadius: '40px',
                            minWidth: '100px',
                            maxWidth: '200px',
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
                        }} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

const ClearFilters = ({ _color, setFilterDate, setFilterToStation, setFilterFromStation, setDateValue, setFromSat, setToSat }) => {

    const handleClearFilters = () => {
        setFilterDate("");
        setFilterToStation("");
        setFilterFromStation("");
        setDateValue(null);
        setFromSat(null);
        setToSat(null);
    }
    return (
        <div className="clear-filter-container" style={{ backgroundColor: "white" }}
            onClick={handleClearFilters}>
            <FilterAltOffIcon sx={{
                color: _color,
            }} />
        </div>
    )
}


const Filters = ({ _color, setFilterDate, setFilterToStation, setFilterFromStation }) => {

    const [RideStations, setRideStations] = React.useState([]);


    const getAllStations = async () => {
        const token = localStorage.getItem('token');

        try {
            const stationsData = await request('GET', '/stations/all', token);
        
            if (stationsData.error) {
                throw new Error(stationsData.error);
            }
        
            setRideStations(stationsData.stations.map(station => station.Address));
        
        } catch (error) {
            console.error('Error fetching stations:', error);
            return [];
        }

    }

    React.useEffect(() => {
        getAllStations();
    }, []);

    const [dateValue, setDateValue] = React.useState(null);
    const [toSat, setToSat] = React.useState(null);
    const [fromSat, setFromSat] = React.useState(null);

    const isComputerScreen = useMediaQuery('(min-width:830px)');

    return (
        <div className="filters-container">
            <div className="row-flex">
                <span className="filter-title" style={{ color: _color }}>סנן לפי</span>
                {!isComputerScreen ? <ClearFilters
                    _color={_color}
                    setFilterDate={setFilterDate}
                    setFilterToStation={setFilterToStation}
                    setFilterFromStation={setFilterFromStation}
                /> : null}
            </div>
            <div style={{ marginTop: "8px" }}>
                <Autocomplete
                    value={fromSat}
                    onChange={(event, newValue) => {
                            setFilterFromStation(newValue);
                            setFromSat(newValue);
                            console.log(newValue);
                        }
                    }
                    disablePortal
                    disableClearable
                    id="combo-box-drop-station"
                    options={RideStations}
                    sx={{
                        minWidth: '200px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '40px',
                            height: '45px',
                            // backgroundColor: "#50BB82",
                            // color: 'white',

                        },
                        '& .MuiFormLabel-root': {
                            lineHeight: '0.8',
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label="מוצא" />}
                />
            </div>
                    {RideStations? (
            <div style={{ marginTop: "8px" }}>
                <Autocomplete
                    value={toSat}
                    onChange={(event, newValue) => {
                        setFilterToStation(newValue);
                        setToSat(newValue);
                        console.log(newValue);
                    }}
                    disablePortal
                    disableClearable
                    id="combo-box-drop-station"
                    options={RideStations}
                    sx={{
                        minWidth: '200px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '40px',
                            height: '45px',
                            // backgroundColor: "#50BB82",
                            // color: 'white',

                        },
                        '& .MuiFormLabel-root': {
                            lineHeight: '0.8',
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label="יעד" />}
                />
            </div>
            ) : <div>loading...</div>}
            <ResponsiveDatePickers setFilterDate={setFilterDate} dateValue={dateValue} />

            {isComputerScreen ? <ClearFilters
                _color={_color}
                setFilterDate={setFilterDate}
                setFilterToStation={setFilterToStation}
                setFilterFromStation={setFilterFromStation}
                setDateValue={setDateValue}
                setFromSat={setFromSat}
                setToSat={setToSat}
            /> : null}
        </div>

    )
}

export default Filters;