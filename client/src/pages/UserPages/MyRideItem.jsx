import React, {useState} from "react";
import "../../style/RideRegister.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';
import Stations from "./Stations";

const MyRideItem = ({ registerId, exitCity, targetCity, date, time, status, toStation, fromStation, stationsList, setMessegesIsClicked }) => {


    const [rgisterStatus, setRegisterStatus] = useState(status);

    const handleCancelRgister = async () => {

            try {
                const response = await fetch(`${api}/update/status/registrations/${transportationID}/${registrationID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
        
                if (data.transportations) {
                    console.log('my ride:', data.transportations);
                    
                    const myRideIn = data.transportations.map(ride => {
                        return {
                            rideId: ride.TransportationID,
                            toStation: ride.DropoffStationAddress,
                            fromStation: ride.PickupStationAddress,
                            RegistrationsStatus: ride.Registration_Status,
                            Time: ride.Transportation_Time,
                            Date: new Date(ride.ExecutionDate).toLocaleDateString(),  // Changed to full date
                            fromCity: ride.StartStationCity,
                            toCity: ride.DestinationStationCity,
                            RideStations: ride.stations.map(station => {
                                return {
                                    name: station.Address,
                                    id: station.StationID,
                                    type: station.Station_Type
                                };
                            })
                        };
                    });
    
                    return myRideIn;
                } else {
                    console.error('Request failed:', data.message);
                    return null;
                }
        
            } catch (error) {
                console.error('Error during request your ride: ', error);
                return null;
            }
    
       
        //send registerId
        console.log("Cancel register ", registerId);
        setRegisterStatus("cancel");
    };

    const handleReturnedRegister = () => {
        //wait for server 

        //send registerId
        console.log("Returned register ", registerId);
        setRegisterStatus("active");
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
                onClick={()=>setMessegesIsClicked(true)}>
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
            stationsList={stationsList}
            defaultToStation={toStation} 
            defaultFromStation={fromStation}
            registerId={registerId}
            isRegister={false} />
        </div>

    )
}

export default MyRideItem;