import React from "react";
import "../style/Message.css";

const Message = ({ isMyMessege, content, date, hour }) => {

    return (
        <div class="container">
            {isMyMessege ? (
                <div class="message-orange">
                    <p class="message-content">{content}</p>
                    <div class="message-timestamp-right">{date} {hour}</div>
                </div>
            ) : (

                <div class="message-blue">
                    <p class="message-content">{content}</p>
                    <div class="message-timestamp-left">{date} {hour}</div>
                </div>
            )}

        </div>
    )

}

export default Message;