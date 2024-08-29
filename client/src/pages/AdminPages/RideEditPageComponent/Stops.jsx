import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Stops = ({ stops, isAdmin }) => {


    return (
        <div className="stops-father-con">
            <span style={{ fontSize: "22px", fontWeight: '700', color: "#FF914D" }}>תחנות</span>
            <div className="stops-container" style={{ marginTop: "10px" }}>
                {stops.map(stop => <div className="stop">
                    {stop.name}
                    {isAdmin? <CancelIcon sx={{
                        color: "red",
                        fontSize: "180%",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                        '&:hover': {
                            transform: "scale(1.1)", // Slightly grow the icon
                            color: "rgba(255, 0, 0, 0.7)", // Make the color a bit brighter
                        }
                    }} />: null}
                </div>)}
                {isAdmin? <div className="add-stop-button-container">
                    <button className="add-stop-button"
                        style={{
                        }}>
                        הוסף תחנה
                        <AddCircleIcon sx={{
                            color: '#00bf63',
                            fontSize: '1.5em',
                        }} />
                    </button>

                </div>: null}
            </div>


        </div>
    )
}

export default Stops;