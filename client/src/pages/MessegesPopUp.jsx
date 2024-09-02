import React, { useState, useEffect } from "react";
import Message from "./Message";
import "../style/popUp.css";
import Cancel from "@mui/icons-material/Cancel";
import { request } from "../requests";


const MessegesPopUp = ({ userId, rideId, setMessegesIsClicked }) => {

    const [messages, setMessages] = React.useState(null);

    const getRideMessages = async (rideId) => {

        const token = localStorage.getItem('token');
        //get messages from server
        try {
            const response = await request('GET', `/messages//transportation/${rideId}`, token);
            if (response.error) {
                console.error('Failed to return the messages:', response.error);
            } else {
                console.log(response.messages);
                setMessages(
                    response.messages[0].map(intenalmess => ({
                            content: intenalmess.MessageText,
                            date: new Date(intenalmess.SendTime).getFullYear() + '-' + (new Date(intenalmess.SendTime).getMonth() + 1) + '-' + new Date(intenalmess.SendTime).getDate(),
                            hour: new Date(intenalmess.SendTime).getHours() + ':' + new Date(intenalmess.SendTime).getMinutes(),
                            fromId: intenalmess.SenderID,
                        }))
                    );
                // return response.messages;
            }
        }
        catch (err) {
            console.error('Error occurred while return the messages:', err);
        }

        // return [
        //     {
        //         content: "הודעה כללית",
        //         date: "2021-06-01",
        //         hour: "08:00",
        //         fromId: 124,
        //     }
        // ]
    }

    React.useEffect(() => {
        getRideMessages(rideId);
        console.log('mess in effect', messages);
    }, []);


    return (
        <div className="popup">
            {messages ? (
                <div>
                    <div className="popup-message-container">
                        <Cancel className="close-button" onClick={() => setMessegesIsClicked(false)} />
                        <div className="popup-message-title">
                            <span>הודעות</span>
                        </div>
                        {messages.length === 0 ? <div>אין הודעות בנסיעה זו</div> :
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
                </div>) : (<div>loading...</div>)}
        </div>
    )
}

export default MessegesPopUp;
