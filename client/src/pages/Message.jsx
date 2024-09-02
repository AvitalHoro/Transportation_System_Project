import React from "react";
import "../style/Message.css";

const Message = ({ isMymessage, content, date, hour }) => {

    return (
        <div className="container">
            {isMymessage ? (
                <div className="message-orange">
                    <p className="message-content">{content}</p>
                    <div className="message-timestamp-right">{date} {hour}</div>
                </div>
            ) : (

                <div className="message-blue">
                    <p className="message-content">{content}</p>
                    <div className="message-timestamp-left">{date} {hour}</div>
                </div>
            )}

        </div>
    )

}

export default Message;