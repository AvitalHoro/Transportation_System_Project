import React from "react";
import { Cancel } from "@mui/icons-material";
import '../../../style/popUp.css';
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

const AddStationPopUp = ({ setOpenPopUpStation, RideStations, setStopsList, isEditPage, handleAddStation }) => {

    const handleAddStationsToList = () => {
        if (!newValue) {
            alert("אנא בחר תחנה");
            return;
        }
        if (isEditPage) {
            handleAddStation(newValue);
            setOpenPopUpStation(false);
            return;
        }
        setStopsList(prevStopsList => [...prevStopsList, newValue]);
        setOpenPopUpStation(false);
    }

    const [newValue, setNewValue] = React.useState(null);

    console.log('s', RideStations);

    return (
        <div className="popup">
            <div className="add-station-popup">
            <Cancel className="close-button" onClick={()=>setOpenPopUpStation(false)}/>
                <div className="popup-message-title">
                    <span>בחר תחנה</span>
                </div>
                <Autocomplete
                        value={newValue}
                        onChange={(event, newValue) => {
                            setNewValue(newValue);
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

                            },
                            '& .MuiFormLabel-root': {
                                lineHeight: '0.8',
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="תחנת מוצא" />}
                    />
                <div className="popup-add-sat-buttons"
                onClick={handleAddStationsToList}>
                    הוסף תחנה לנסיעה
                </div>
            </div>
        </div>
    )
}

export default AddStationPopUp;