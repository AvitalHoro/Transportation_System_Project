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


const ResponsiveDatePickers = () => {
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
          id="date-picker-inline"
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
            }} defaultValue={dayjs('2022-04-17')} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

const ClearFilters = ({_color}) => {
    return (
        <div className="clear-filter-container"  style={{ backgroundColor: "white" }}>
        <FilterAltOffIcon sx={{
            color: _color,
        }} />
    </div>
    )
}


const Filters = ({ _color }) => {

    const getStationsList = () => {
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

    const isComputerScreen = useMediaQuery('(min-width:830px)');

    const stationsList = getStationsList();
    return (
        <div className="filters-container">
            <div className="row-flex">
            <span className="filter-title" style={{color: _color }}>סנן לפי</span>
            {!isComputerScreen? <ClearFilters/> : null}
            </div>
            <div style={{marginTop: "8px"}}>
            <Autocomplete
                disablePortal
                disableClearable
                id="combo-box-drop-station"
                options={stationsList}
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

            <div style={{marginTop: "8px"}}>
            <Autocomplete
                disablePortal
                disableClearable
                id="combo-box-drop-station"
                options={stationsList}
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
            <ResponsiveDatePickers/> 

            {isComputerScreen? <ClearFilters _color={_color}/>: null}
        </div>

    )
}

export default Filters;