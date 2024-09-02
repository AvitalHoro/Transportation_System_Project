import React, {useState, useEffect} from "react";
import Message from "../Message";
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const MyMessagePage = ({ rideIds, userId }) => {

    console.log('rideIds:', rideIds);

    const [ridemessage, setRidemessage] = useState(null);

    const [generalmessage, setGeneralmessage] = useState(null);

    const getGeneralmessage = async () => {
        //wait for server
        try {

        const response = await fetch(`${api}/messages/generals`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('general message:', data);
            if(!data.messages){
                console.error('Request failed:', data.message);
                return null;
            }

            return data.messages.map(message => {
                return {
                    content: message.MessageText,
                    date: new Date(message.SendTime).toLocaleDateString(),
                    hour: new Date(message.SendTime).getHours() + ':' + new Date(message.SendTime).getMinutes(),
                    fromId: message.SenderID,
                };
            });
        } catch (error) {
            console.error('Error during request your ride: ', error);
            return null;
        }
        // return [
        //     {
        //     content: "הודעה כללית",
        //     date: "2021-06-01",
        //     hour: "08:00",
        //     fromId: 124,
        // }
    }

    const getRidemessage = async (rideId) => {
        console.log('rideId:', rideId); 
        //wait for server
        try {

            const response = await fetch(`${api}/messages/transportation/${rideId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                console.log('ride message:', data.messages[0]);
                if(!data.messages){
                    console.error('Request failed:', data.messages);
                    return null;
                }
    
                return data.messages[0].map(message => {
                    return {
                        content: message.MessageText,
                        date: new Date(message.SendTime).toLocaleDateString(),
                        hour: new Date(message.SendTime).getHours() + ':' + new Date(message.SendTime).getMinutes(),
                        fromId: message.SenderID,
                    };
                });
            } catch (error) {
                console.error('Error during request your ride: ', error);
                return null;
            }
    
    }

    useEffect(() => {
        getGeneralmessage().then(messages => {
            setGeneralmessage(messages);
            console.log('my messages in effect:', messages);
        });
    }, []); // Empty dependency array means this effect runs once on mount


    useEffect(() => {
        const fetchMessages = async () => {
            const promises = rideIds.map(rideId => getRidemessage(rideId));
            const messages = await Promise.all(promises);
        
            // Flatten the array
            const flattenedMessages = messages.flat();
        
            setRidemessage(flattenedMessages);
            console.log('ride messages in effect:', flattenedMessages);
        };

        fetchMessages();
    }, [rideIds]); // Add rideIds as a dependency to avoid infinite loop


    // const generalmessage = getGeneralmessage();

    // let ridemessage = [];
    // rideIds.map(rideId => ridemessage.push(...getRidemessage(rideId)));

    console.log(ridemessage);
    console.log(generalmessage);
    return (
        <div>
            {generalmessage && ridemessage? (
                <div>
            <div className="general-message-container">
                <div className="general-message-title">
                    <span>הודעות כלליות</span>
                </div>
                <div className="general-message-content">
                    {generalmessage.map((message, index) => <Message
                        key={index}
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
                    {ridemessage.map((message, index) => <Message
                        key={index}
                        isMymessage={message.fromId === userId}
                        content={message.content}
                        date={message.date}
                        hour={message.hour}
                    />)}
                </div>
            </div>
            </div>):(<p>Loading messages...</p>)}
        </div>
    )
}

export default MyMessagePage;