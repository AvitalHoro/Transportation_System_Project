import React from "react";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
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


const ResponsiveTimePickers = () => {
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
            defaultValue={dayjs('2022-04-17T15:30')} />
          </DemoItem>
        
        </DemoContainer>
      </LocalizationProvider>
    );
  }


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
              }} defaultValue={dayjs('2022-04-17')} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  
const AddRide = () => {

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

    const getAllDrivers = () => {
        return [
            "דוד כהן",
            "אבי כהן",
            "משה כהן",
            "ישראל כהן",
            "אהרון כהן",
        ]
    }

    const stationsList = getStationsList();
    const driversList = getAllDrivers();
    const stopsList = [];

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "8%",
            boxSizing: "border-box",
        }}>
            <div style={{
                color: "#00bf63",
                fontWeight: "bold",
                fontSize: "1.5em",
            }}>הוסף נסיעה</div>
          <div className="add-ride-container">
  
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
  
                      },
                      '& .MuiFormLabel-root': {
                          lineHeight: '0.8',
                      }
                  }}
                  renderInput={(params) => <TextField {...params} label="תחנת מוצא" />}
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
  
                      },
                      '& .MuiFormLabel-root': {
                          lineHeight: '0.8',
                      }
                  }}
                  renderInput={(params) => <TextField {...params} label="תחנת יעד" />}
              />
              </div>
              <ResponsiveDatePickers/> 
              <ResponsiveTimePickers/>
              <Autocomplete
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
                    {stop.stationName}
                    <CancelIcon sx={{
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
                        style={{ marginTop: "0"
                        }}>
                        הוסף תחנה
                        <AddCircleIcon sx={{
                            color: '#00bf63',
                            fontSize: '1.5em',
                        }} />
                    </button>

                </div>
            </div>
  
        </div>
    )
}

export default AddRide;

