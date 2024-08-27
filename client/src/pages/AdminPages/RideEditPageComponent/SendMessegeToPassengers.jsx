import React from "react";
import SendIcon from '@mui/icons-material/Send';
import '../../../style/AdminRideEdit.css'
import Cancel from "@mui/icons-material/Cancel";

const CancelButton = () => {
    return (
        <div className="cancel-button-container">
            <button className="cancel-button" 
            style={{
            }}>
                לחץ כאן כדי לבטל את הנסיעה
                <Cancel sx={{
                    color: 'red',
                    fontSize: '1.5em',
                }}/>
            </button>

        </div>
    )
}

const SendMessegeToPassengers = () => {
    const stopsList = [];
    return (
        <div className="send-mess-father-con">
            <div>
                <span style={{ fontSize: "22px", fontWeight: '700', color: "#00bf63" }}>שלח הודעה לנוסעים</span>
                <div className="send-message-container" style={{ marginTop: "10px" }}>
                    <textarea className="message-textarea" placeholder="הקלד הודעה לנוסעים"></textarea>
                    <SendIcon sx={{ transform: 'scaleX(-1)', color: "#00bf63", transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out", cursor: "pointer",
                        '&:hover': {
                            transform: "scaleX(-1.1) scaleY(1.1)", // Slightly grow the icon
                            color: "rgba(0, 191, 99, 0.7)", // Make the color a bit brighter
                        }
                     }}/>
                </div>
            </div>
            <CancelButton />
        </div>
    )
}

export default SendMessegeToPassengers;