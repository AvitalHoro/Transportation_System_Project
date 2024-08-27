import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
// import '../../../style/AdminRideEdit.css'


const Stops = ({rideId}) => {

    const getAllRideStops = (rideId) => {
        return [
            {
                stationName: "ארלוזורוב",
                RidestationId: 7668,
                stationNum: 2,
            },
            {
                stationName: "קרית אונו",
                RidestationId: 7669,
                stationNum: 1,
            },
            {
                stationName: "מרכזית המפרץ",
                RidestationId: 7670,
                stationNum: 3,
            },
            {
                stationName: "צומת בית קמה",
                RidestationId: 7671,
                stationNum: 4,
            }

        ]
    }

    const stopsList = getAllRideStops(rideId);

    return (
        <div className="stops-father-con">
            <span style={{fontSize: "22px", fontWeight: '700', color: "#FF914D"}}>תחנות</span>
        <div className="stops-container" style={{marginTop: "10px"}}>
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
                }}/>
                </div>)}
        </div>
        </div>
    )
}

export default Stops;