import React from "react";
import Message from "../Message";

const MyMessagePage = ({ rideIds, userId }) => {

    const getGeneralmessage = () => {
        //wait for server
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
        //wait for server
        return [
            {
            content: "הודעה כללית",
            date: "2021-06-01",
            hour: "08:00",
            fromId: 123,
        }
    ]
    }

    const generalmessage = getGeneralmessage();

    let ridemessage = [];
    rideIds.map(rideId => ridemessage.push(...getRidemessage(rideId)));

    console.log(ridemessage);
    console.log(generalmessage);
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