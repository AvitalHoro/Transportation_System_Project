import React from "react";
import "../../style/RideRegister.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stations from "./Stations";
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const RideRegister = ({userId, rideId, exit, target, date, time, stationsList, setRegisterUpdate}) => {

    const [fromStation, setFromStation] = React.useState(null);
    const [toStation, setToStation] = React.useState(null);

    function getIdByName(name) {
        const station = stationsList.find(station => station.name === name);
        return station ? station.id : null; // Return the id if found, otherwise return null
    }

    const handleRegister = async () => {
        if (!fromStation || !toStation) {
            alert("אנא בחר תחנות");
            return;
        }

        const transportationId = rideId;
        const pickupStationId = getIdByName(fromStation);
        const dropoffStationId = getIdByName(toStation);
        const executionDate = new Date();

        try {
            const response = await fetch(`${api}/registrations/register/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    transportationId,
                    pickupStationId,
                    dropoffStationId,
                    executionDate
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
                console.log("Register to ride ", rideId, fromStation, toStation);
                alert("הרשמתך לנסיעה נרשמה בהצלחה");
                setRegisterUpdate(rideId);
            }
    

        } catch (error) {
            console.error('Error during request your ride: ', error);
        }        

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