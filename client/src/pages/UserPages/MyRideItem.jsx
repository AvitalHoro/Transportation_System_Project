import React, {useState} from "react";
import "../../style/RideRegister.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';
import Stations from "./Stations";
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const MyRideItem = ({ userId, registerId, exitCity, targetCity, date, time, status, toStation, fromStation, RideStations, setMessegesIsClicked, setRideSelectedId }) => {


    const [rgisterStatus, setRegisterStatus] = useState(status);

    const handleCancelRgister = async () => {

            try {
                const response = await fetch(`${api}/registrations/update/status/${userId}/${registerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        statusTransportation: 'cancel' // Replace 'newStatus' with the status you want to update to
                    })
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
        
                if (data.message === 'The status of registration updated successfully') {
                    console.log("Cancel register ", registerId);
                    setRegisterStatus("cancel");
                    return data.message; 
                } else {
                    console.error('Request failed:', data.message);
                    return null; 
                }
        
            } catch (error) {
                console.error('Error during request your ride: ', error);
                return null;
            }
    
           
    };

    const handleReturnedRegister = async () => {
        try {
            const response = await fetch(`${api}/registrations/update/status/${userId}/${registerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    statusTransportation: 'active' // Replace 'newStatus' with the status you want to update to
                })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.message === 'The status of registration updated successfully') {
                console.log("Returned register ", registerId);
                setRegisterStatus("active");
                return data.message; 
            } else {
                console.error('Request failed:', data.message);
                return null; 
            }
    
        } catch (error) {
            console.error('Error during request your ride: ', error);
            return null;
        }

    }

    return (
        <div className="ride-register-container" 
        style={{
            border: rgisterStatus==="active"? "" : "rgb(237, 29, 43) 4px solid" }}>
            <div className="top-register-container">
                <div className="details-container">
                    <div className="detail">
                        <ArrowCircleLeftIcon style={{ color: "#50bb82" }} />
                        {/* <img src="./icons/direction-icon.png"></img> */}
                        <span title={`מ${exitCity} ל${targetCity}`} style={{ display: 'inline-block', fontWeight: 'bold', color: "#50bb82", fontSize: "18px", textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>מ{exitCity} ל{targetCity}</span>
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

                <div className="option-ride-item">
                <div className="option-container"
                onClick={()=>{setMessegesIsClicked(true); setRideSelectedId(registerId)}}>
                    <ChatBubbleIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                </div>
                <span className="option-ride-title" style={{color: "#FFD700" }}>הודעות</span>
            </div>
            {rgisterStatus === "active" ? (
            <div className="option-ride-item">

                    
                <div className="option-container" style={{backgroundColor: "#ED1D2B"}}
                onClick={handleCancelRgister}>
                    <ClearIcon sx={{
                        color: "white",
                        fontSize: "180%",
                        fontWeight: "bold"
                    }} />
                </div> 
                <span className="option-ride-title" style={{color: "#ED1D2B" }}>בטל רישום</span> :
                
                </div>
    ):(
    <div className="option-ride-item">

                    
    <div className="option-container" style={{backgroundColor: "#50BB82"}}
    onClick={handleReturnedRegister}>
        <ReplayIcon sx={{
            color: "white",
            fontSize: "180%",
            fontWeight: "bold"
        }} />
    </div> 
    <span className="option-ride-title" style={{color: "#50BB82" }}>שחזר רישום</span> :
    
    </div>
    )}

            </div>
            <Stations 
            RideStations={RideStations}
            defaultToStation={toStation} 
            defaultFromStation={fromStation}
            registerId={registerId}
            isRegister={false} />
        </div>

    )
}

export default MyRideItem;