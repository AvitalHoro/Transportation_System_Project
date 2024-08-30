import React from "react";
import SendIcon from '@mui/icons-material/Send';
import '../../../style/AdminRideEdit.css'
import Cancel from "@mui/icons-material/Cancel";
import { addMessegeToPassengers } from '../../../requests'
import Replay from "@mui/icons-material/Replay";

const CancelButton = ({setRideStatus, rideStatus, rideId}) => {

    const handleCancelRide = () => {
        //wait for server 

        //send rideId
        console.log("Cancel register ", rideId);
        setRideStatus("cancel");

        //wait for server
        //send message to passengers in this ride "הנסיעה שנרשמתם אליה בוטלה"
    }

    const handleReturnedRide = () => {
        //wait for server 

        //send rideId
        console.log("Returned register ", rideId);
        setRideStatus("active");

        //wait for server
        //send message to passengers in this ride "הנסיעה שנרשמתם אליה שוחזרה"
    }

    console.log("RideStatus: ", rideStatus);

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

const SendMessegeToPassengers = ({ rideId, isAdmin }) => {
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

    const handleSendMessage = async () => {
        if(messageContent === "") {
            alert("אנא הקלד הודעה לשליחה");
            return;
        }

        const sendTime = getCurrentDateTime();

        //wait for server
        try {
            const response = await addMessegeToPassengers(messageContent, sendTime, rideId);
            if (response) {                          //send message to passengers in this rideid

                console.log("Send message to passengers: ", messageContent);
                const messageId = response.messageId;
                const registeredUsers = response.registeredUsers;
                setMessageContent("");
                alert("ההודעה נשלחה בהצלחה");
            }

        } catch {
            alert("תקלה בשליחת ההודעה")
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