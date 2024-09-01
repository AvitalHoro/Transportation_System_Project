import React, { useState } from "react";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ClearIcon from '@mui/icons-material/Clear';
import SyncIcon from '@mui/icons-material/Sync';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReplayIcon from '@mui/icons-material/Replay';
import { request } from "../../requests";

const AdminOptions = ({ setEditOrGallery, setRide, ride, rideStatus, setRideStatus, setMessegesIsClicked, setReplaceDriverIsClicked }) => {
    
    const handleCancelRide = async () => {
        //wait for server 
        try {
            const token = localStorage.getItem('token'); 
            const response = await request('DELETE', `transportations/delete/${ride.id}`, token);
    
            if (response.error) {
                console.error('Failed to cancel the ride:', response.error);
            } else {
                console.log("Cancel register ", ride.id);
                setRideStatus("cancel");
            }
        } catch (err) {
            console.error('Error occurred while canceling the ride:', err);
        }
    }

    const handleReturnedRide = async () => {
        //wait for server 
        try {
            const token = localStorage.getItem('token'); 
            const transportations = localStorage.getItem('transportations');
            const transportationData = JSON.parse(transportations);
            const currRide = transportationData.find(ride => ride.TransportationID === ride.id);
            const driverId = currRide ? currRide.DriverID : null;
            const maxPassengers = currRide ? currRide.MaxPassengers : null;
            const body = {
                transportationDate: ride.date, 
                transportationTime: ride.time, 
                transportationStatus: ride.status, 
                driver: driverId,
                maxPassengers: maxPassengers
            };
            const response = await request('POST', 'transportations/add/', token, body);

            if (response.error) {
                console.error('Failed to return the ride:', response.error);
            } else {
                console.log("Returned register ", ride.id);
                setRideStatus("active");
            }
        } catch (err) {
            console.error('Error occurred while return the ride:', err);
        }
    }

    return (
        <div>
            <div className="row-option-ride">
                <div className="option-ride-item">
                    <div className="option-container"
                    onClick={()=>{setMessegesIsClicked(true); setRide(ride);}}>
                        <ChatBubbleIcon sx={{
                            color: "white",
                            fontSize: "180%",
                        }} />
                    </div>
                    <span className="option-ride-title" style={{ color: "#FFD700" }}>הודעות</span>
                </div>
                {rideStatus === "active" ? (
                    <div className="option-ride-item">
                        <div
                            className="option-container"
                            style={{ backgroundColor: "#ED1D2B" }}
                            onClick={handleCancelRide}
                        >
                            <ClearIcon
                                sx={{
                                    color: "white",
                                    fontSize: "180%",
                                    fontWeight: "bold",
                                }}
                            />
                        </div>
                        <span className="option-ride-title" style={{ color: "#ED1D2B" }}>
                            בטל נסיעה
                        </span>
                    </div>
                ) : (
                    <div className="option-ride-item">
                        <div
                            className="option-container"
                            style={{ backgroundColor: "#50BB82" }}
                            onClick={handleReturnedRide}
                        >
                            <ReplayIcon
                                sx={{
                                    color: "white",
                                    fontSize: "180%",
                                    fontWeight: "bold",
                                }}
                            />
                        </div>
                        <span className="option-ride-title" style={{ color: "#50BB82" }}>
                            שחזר נסיעה
                        </span>
                    </div>
                )}
            </div>

            <div className="row-option-ride">
                <div className="option-ride-item">
                    <div className="option-container" style={{ backgroundColor: "#CB6CE6" }}
                    onClick={()=>{setReplaceDriverIsClicked(true); setRide(ride);}} >
                        <SyncIcon sx={{
                            color: "white",
                            fontSize: "180%",
                        }} />
                    </div>
                    <span className="option-ride-title" style={{ color: "#CB6CE6" }}>החלף נהג</span>
                </div>

                <div className="option-ride-item"
                    onClick={() => { setEditOrGallery(1); setRide(ride); console.log(ride); }}>
                    <div className="option-container" style={{ backgroundColor: "#77B6F1" }}>
                        <EditNoteIcon sx={{
                            color: "white",
                            fontSize: "180%",
                        }} />
                    </div>
                    <span className="option-ride-title"
                        style={{ color: "#77B6F1" }}
                    >ערוך פרטי נסיעה</span>
                </div>

            </div>
        </div>
    )
}

export default AdminOptions;