import React, { useState } from "react";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ClearIcon from '@mui/icons-material/Clear';
import SyncIcon from '@mui/icons-material/Sync';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReplayIcon from '@mui/icons-material/Replay';
import { request } from "../../requests";
const token = localStorage.getItem('token'); 
const api = 'http://localhost:5000/api';

const AdminOptions = ({ setEditOrGallery, setRide, ride, rideStatus, setRideStatus, setMessegesIsClicked, setReplaceDriverIsClicked }) => {

    const handleCancelRide = async () => {
        try {
            const newStatus = 'cancel';
            const response = await request('PUT', `/transportations/updateStatus/${ride.id}`, token, { newStatus });
    
            if (response.error) {
                console.error('Failed to cancel the ride:', response.error);
            } else {
                console.log("Ride canceled:", ride.id);
                setRideStatus("cancel");
                const sendTime = getCurrentDateTime();
                const messageContent = "הנסיעה שנרשמתם אליה בוטלה"
                const response = await fetch(`${api}/messages/add/${ride.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ messageContent, sendTime }),
                });
                if (response.ok) {
                    console.log("the message about the cancel send")          
                } else {
                    console.log("the message about the can not cancel send")      
                }    
            }
        } catch (err) {
            console.error('Error occurred while canceling the ride:', err);
        }
    }
    
    const handleReturnedRide = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const newStatus = 'active';
            const response = await request('PUT', `/transportations/updateStatus/${ride.id}`, token, { newStatus });
    
            if (response.error) {
                console.error('Failed to return the ride:', response.error);
            } else {
                console.log("Ride returned:", ride.id);
                setRideStatus("active");
                const sendTime = getCurrentDateTime();
                const messageContent = "הנסיעה שנרשמתם אליה שוחזרה"
                const response = await fetch(`${api}/messages/add/${ride.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ messageContent, sendTime }),
                });
                if (response.ok) {
                    console.log("the message about the cancel send")          
                } else {
                    console.log("the message about the can not cancel send")      
                }    
            }
        } catch (err) {
            console.error('Error occurred while returning the ride:', err);
        }
    }

    const getCurrentDateTime = () => {
        const now = new Date();
    
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
    
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

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