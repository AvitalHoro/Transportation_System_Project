import React from "react";
import "../../style/RideRegister.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stations from "./Stations";

const RideRegister = ({rideId, exit, target, date, time}) => {

    // const ride = {
    //     exit: "תל אביב",
    //     target: "ירושלים",
    //     date: "2021-06-01",
    //     time: "08:00",
    //     seats: 3,
    //     price: 30
    // }
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


                <div className="plus-container">
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
            <Stations />
        </div>

    )
}

export default RideRegister;