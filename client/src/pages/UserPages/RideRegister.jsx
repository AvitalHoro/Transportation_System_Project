import React from "react";
import "../../style/RideRegister.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stations from "./Stations";

const RideRegister = ({rideId, exit, target, date, time, stationsList}) => {

    const [fromStation, setFromStation] = React.useState(null);
    const [toStation, setToStation] = React.useState(null);

    const handleRegister = () => {
        if (!fromStation || !toStation) {
            alert("אנא בחר תחנות");
            return;
        }
        //wait for server
        //send rideId, fromStation, toStation
        console.log("Register to ride ", rideId, fromStation, toStation);
    }

    return (
        <div className="ride-register-container">
            <div className="top-register-container">
                <div className="details-container">
                    <div className="detail">
                        <ArrowCircleLeftIcon style={{ color: "#50bb82" }} />
                        {/* <img src="./icons/direction-icon.png"></img> */}
                        <span style={{ fontWeight: 'bold', color: "#50bb82", fontSize: "18px" }}>מ{exit} ל{target}</span>
                    </div>
                    <div className="detail">
                        <CalendarMonthIcon style={{ color: "#50bb82" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>{date}</span>
                    </div>
                    <div className="detail">
                        <ScheduleIcon style={{ color: "#50bb82" }} />
                        {/* <img src="./icons/time-icon.png"></img> */}
                        <span>{time}</span>
                    </div>
                </div>


                <div className="plus-container"
                onClick={handleRegister}>
                    <AddCircleIcon sx={{
                        color: "#50bb82",
                        fontSize: "550%",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                        '&:hover': {
                            transform: "scale(1.1)", // Slightly grow the icon
                            color: "rgba(80, 187, 130, 0.7)", // Make the color a bit brighter
                        },
                    }} />
                </div>
            </div>
            <Stations 
            stationsList={stationsList}
            isRegister={true}
            setToStation={setToStation}
            setFromStation={setFromStation}
            />
        </div>

    )
}

export default RideRegister;