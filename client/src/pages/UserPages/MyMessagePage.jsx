import React from "react";
import Message from "../Message";

const MyMessagePage = ({ rideIds, userId }) => {

    const getGeneralmessage = () => {
        return [
            {
            content: "הודעה כללית",
            date: "2021-06-01",
            hour: "08:00",
            fromId: 124,
        }
    ]
    }

    const getRidemessage = (rideId) => {
        return [
            {
            content: "הודעה כללית",
            date: "2021-06-01",
            hour: "08:00",
            from: "admin",
        }
    ]
    }


    const generalmessage = getGeneralmessage();
    const ridemessage = rideIds.map(rideId => getRidemessage(rideId));

    return (
        <div>
            <div className="general-message-container">
                <div className="general-message-title">
                    <span>הודעות כלליות</span>
                </div>
                <div className="general-message-content">
                    {generalmessage.map(message => <Message
                        isMymessage={message.fromId === userId}
                        content={message.content}
                        date={message.date}
                        hour={message.hour}
                    />)}

                </div>
            </div>

            <div className="ride-message-container">
                <div className="ride-message-title">
                    <span>הודעות בנסיעות שאתה רשום אליהם</span>

                </div>
                <div className="ride-message-content">
                    {ridemessage.map(message => <Message
                        isMymessage={message.from === userId}
                        content={message.content}
                        date={message.date}
                        hour={message.hour}
                    />)}
                </div>
            </div>
        </div>
    )
}

export default MyMessagePage;