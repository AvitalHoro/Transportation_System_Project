import React from "react";
import SendIcon from '@mui/icons-material/Send';
import '../../../style/AdminRideEdit.css'
import Cancel from "@mui/icons-material/Cancel";
import Replay from "@mui/icons-material/Replay";
import { request } from "../../../requests";
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const CancelButton = ({setRideStatus, rideStatus, rideId}) => {

    const handleCancelRide = async () => {
        try {
            const newStatus = 'cancel';
            const response = await request('PUT', `/transportations/updateStatus/${rideId}`, token, { newStatus });
    
            if (response.error) {
                console.error('Failed to cancel the ride:', response.error);
            } else {
                console.log("Ride canceled:", rideId);
                setRideStatus("cancel");
                const sendTime = getCurrentDateTime();
                const messageContent = "הנסיעה שנרשמתם אליה בוטלה"
                const response = await fetch(`${api}/messages/add/${rideId}`, {
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
            const response = await request('PUT', `/transportations/updateStatus/${rideId}`, token, { newStatus });
    
            if (response.error) {
                console.error('Failed to return the ride:', response.error);
            } else {
                console.log("Ride returned:", rideId);
                setRideStatus("active");
                const sendTime = getCurrentDateTime();
                const messageContent = "הנסיעה שנרשמתם אליה שוחזרה"
                const response = await fetch(`${api}/messages/add/${rideId}`, {
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

    return (
        <div className="cancel-button-container">
            {rideStatus==="active"? (<button className="cancel-button"
            onClick={handleCancelRide}
                style={{
                }}>
                לחץ כאן כדי לבטל את הנסיעה
                <Cancel sx={{
                    color: 'red',
                    fontSize: '1.5em',
                }} />
            </button>) : (<button className="return-button"
            onClick={handleReturnedRide}
                style={{
                }}>
                לחץ כאן כדי לשחזר את הנסיעה
                <Replay sx={{
                    color: 'green',
                    fontSize: '1.5em',
                }} />
            </button>

            )}
        </div>
    )
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

const SendMessegeToPassengers = ({ rideId, isAdmin, rideStatus, setRideStatus }) => {

    const handleSendMessage = async () => {
        if(messageContent === "") {
            alert("אנא הקלד הודעה לשליחה");
            return;
        }

        const sendTime = getCurrentDateTime();
        try {
            const response = await fetch(`${api}/messages/add/${rideId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ messageContent, sendTime }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("messageID: ", data.messageId);
                console.log("Send message to passengers: ", data.registeredUsers);
                alert("ההודעה נשלחה בהצלחה");
                setMessageContent("");
                return data;           
            } else {
                alert("תקלה בשליחת ההודעה")
                setMessageContent("");
                return null
            }
        } catch (error) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }

    const [messageContent, setMessageContent] = React.useState("");

    return (
        <div className="send-mess-father-con">
            <div>
                <span style={{ fontSize: "22px", fontWeight: '700', color: "#00bf63" }}>שלח הודעה לנוסעים</span>
                <div className="send-message-container" style={{ marginTop: "10px" }}>
                    <textarea
                        className="message-textarea"
                        placeholder="הקלד הודעה לנוסעים"
                        value={messageContent} // Bind the state variable to the textarea's value
                        onChange={(e) => setMessageContent(e.target.value)}>
                    </textarea>
                    <SendIcon 
                    sx={{
                        transform: 'scaleX(-1)', color: "#00bf63", transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out", cursor: "pointer",
                        '&:hover': {
                            transform: "scaleX(-1.1) scaleY(1.1)", // Slightly grow the icon
                            color: "rgba(0, 191, 99, 0.7)", // Make the color a bit brighter
                        }
                    }}
                    onClick={handleSendMessage} />
                </div>
            </div>
            {isAdmin ? <CancelButton rideStatus={rideStatus} setRideStatus={setRideStatus} rideId={rideId}/> : null}
        </div>
    )
}

export default SendMessegeToPassengers;