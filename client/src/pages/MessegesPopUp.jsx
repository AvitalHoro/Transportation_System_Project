import React from "react";
import Message from "./Message";
import "../style/popUp.css";
import Cancel from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";

const MessegesPopUp = ({ userId, rideId, setMessegesIsClicked }) => {
    const getMessages = (rideId) => {
        return [
            {
                content: "הודעה כללית",
                date: "2021-06-01",
                hour: "08:00",
                fromId: 124,
            }
        ]
    }

    const messages = getMessages(rideId);
    console.log(messages);

    return (
        <div className="popup">
            <div className="popup-message-container">
                <Cancel className="close-button" onClick={()=>setMessegesIsClicked(false)}/>
                <div className="popup-message-title">
                    <span>הודעות</span>
                </div>
                { messages.length === 0? <div>אין הודעות בנסיעה זו</div> :
                <div className="popup-message-content">
                    {messages.map(message => <Message
                        isMymessage={message.fromId === userId}
                        content={message.content}
                        date={message.date}
                        hour={message.hour}
                    />)}

                </div>
                }
                {/* <div className="popup-message-buttons">
                    שלח הודעה חדשה
                </div> */}
            </div>
        </div>
    )
}

export default MessegesPopUp;
