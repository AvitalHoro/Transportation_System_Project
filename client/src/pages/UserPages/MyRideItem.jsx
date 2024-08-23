import React from "react";
import "../../style/RideRegister.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';
import Stations from "./Stations";

const MyRideItem = ({ ride }) => {

    const ride = {
        exit: "תל אביב",
        target: "ירושלים",
        date: "2021-06-01",
        time: "08:00",
        status: "active",
    }
    return (
        <div className="ride-register-container" 
        style={{
            backgroundColor: ride.status==="active"? "" : "rgba(237, 29, 43, 0.3)" }}>
            <div className="top-register-container">
                <div className="details-container">
                    <div className="detail">
                        <ArrowCircleLeftIcon style={{ color: "#50bb82" }} />
                        {/* <img src="./icons/direction-icon.png"></img> */}
                        <span style={{ fontWeight: 'bold', color: "#50bb82", fontSize: "18px" }}>מ{ride.exit} ל{ride.target}</span>
                    </div>
                    <div className="detail">
                        <CalendarMonthIcon style={{ color: "#50bb82" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>{ride.date}</span>
                    </div>
                    <div className="detail">
                        <ScheduleIcon style={{ color: "#50bb82" }} />
                        {/* <img src="./icons/time-icon.png"></img> */}
                        <span>{ride.time}</span>
                    </div>
                </div>

                <div className="option-ride-item">
                <div className="option-container">
                    <ChatBubbleIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                </div>
                <span className="option-ride-title" style={{color: "#FFD700" }}>הודעות</span>
            </div>
            {ride.status === "active" ? (
            <div className="option-ride-item">

                    
                <div className="option-container" style={{backgroundColor: "#ED1D2B"}}>
                    <ClearIcon sx={{
                        color: "white",
                        fontSize: "180%",
                        fontWeight: "bold"
                    }} />
                </div> 
                <span className="option-ride-title" style={{color: "#ED1D2B" }}>בטל נסיעה</span> :
                
                </div>
    ):(
    <div className="option-ride-item">

                    
    <div className="option-container" style={{backgroundColor: "#50BB82"}}>
        <ReplayIcon sx={{
            color: "white",
            fontSize: "180%",
            fontWeight: "bold"
        }} />
    </div> 
    <span className="option-ride-title" style={{color: "#50BB82" }}>שחזר נסיעה</span> :
    
    </div>
    )}

            </div>
            <Stations />
        </div>

    )
}

export default MyRideItem;