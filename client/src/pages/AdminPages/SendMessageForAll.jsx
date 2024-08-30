import React from "react";
import SendIcon from '@mui/icons-material/Send';

const SendMessageForAll = () => {
    return (
                        <div className="send-messege-for-all-page">
                <span style={{ fontSize: "22px", fontWeight: '700', color: "#00bf63" }}>שלח הודעה לכולם</span>
                <div className="send-message-container" style={{ marginTop: "10px" }}>
                    <textarea className="message-textarea" placeholder="הקלד הודעה לנוסעים"></textarea>
                    <SendIcon sx={{ fontSize: '3em', transform: 'scaleX(-1)', color: "#00bf63", transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out", cursor: "pointer",
                        '&:hover': {
                            transform: "scaleX(-1.1) scaleY(1.1)", // Slightly grow the icon
                            color: "rgba(0, 191, 99, 0.7)", // Make the color a bit brighter
                        }
                     }}/>
                </div>
            </div>
    )
}

export default SendMessageForAll;