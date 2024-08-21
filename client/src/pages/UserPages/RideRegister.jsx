import React from "react";
import "../../style/UserPages.css"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Stations from "./Stations";

const RideRegister = () => {

    const ride = {
        exit: "תל אביב",
        target: "ירושלים",
        date: "2021-06-01",
        time: "08:00",
        seats: 3,
        price: 30
    }
    return (
        <div className="ride-register-container">
            <div className="details-container">
                <div className="detail">
                    <ArrowCircleLeftIcon  style={{color: "#50bb82"}}/>
                    {/* <img src="./icons/direction-icon.png"></img> */}
                    <span style={{fontWeight: 'bold', color: "#50bb82", fontSize: "18px"}}>מ{ride.exit} ל{ride.target}</span>
                </div>
                <div className="detail">
                    <ScheduleIcon  style={{color: "#50bb82"}}/>
                    {/* <img src="./icons/date-icon.png"></img> */}
                    <span>{ride.date}</span>
                </div>
                <div className="detail">
                <CalendarMonthIcon style={{color: "#50bb82"}}/>
                    {/* <img src="./icons/time-icon.png"></img> */}
                    <span>{ride.time}</span>
                </div>
            </div>


            <div>
                <img src="./icons/plus" alt="" />
            </div>

            <Stations/>
        </div>
    )
}

export default RideRegister;