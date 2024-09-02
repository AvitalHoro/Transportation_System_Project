import React from "react";
import SendIcon from '@mui/icons-material/Send';
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const SendMessageForAll = () => {

    const handleSendMessage = async () => {
        if(messageContent === "") {
            alert("אנא הקלד הודעה לשליחה");
            return;
        }

        const sendTime = getCurrentDateTime();
        try {
            const response = await fetch(`${api}/messages/add/`, {
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

    return (
                        <div className="send-messege-for-all-page">
                <span style={{ fontSize: "22px", fontWeight: '700', color: "#00bf63" }}>שלח הודעה לכולם</span>
                <div className="send-message-container" style={{ marginTop: "10px" }}>
                    <textarea
                    className="message-textarea"
                    placeholder="הקלד הודעה לנוסעים"
                    value={messageContent} 
                    onChange={(e) => setMessageContent(e.target.value)}>
                    </textarea>
                    <SendIcon sx={{ fontSize: '3em', transform: 'scaleX(-1)', color: "#00bf63", transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out", cursor: "pointer",
                        '&:hover': {
                            transform: "scaleX(-1.1) scaleY(1.1)", // Slightly grow the icon
                            color: "rgba(0, 191, 99, 0.7)", // Make the color a bit brighter
                        }
                     }}
                     onClick={handleSendMessage} />
                </div>
            </div>
    )
}

export default SendMessageForAll;

