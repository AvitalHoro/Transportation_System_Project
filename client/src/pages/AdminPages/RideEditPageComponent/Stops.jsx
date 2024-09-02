import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { request } from '../../../requests';
import { api } from '../../../config.json';


const Stops = ({ rideId, isAdmin, dynamicStopsList, setDynamicStopsList, setOpenStationsPopUp }) => {

    console.log('d', dynamicStopsList);

    const handleAddStop = () => {
        setOpenStationsPopUp(true);
        console.log("openPopUp");
    }

    const handleCancelStop = async (stopId, stopName) => {
        if(dynamicStopsList.find(stop => stop.id === stopId).type === "Starting" || dynamicStopsList.find(stop => stop.id === stopId).type === "Destination"){
            alert("לא ניתן לבטל תחנה מוצא/יעד");
            return;
        }

        //change the station with id===stopId status to cancel

        const token = localStorage.getItem('token');
        const transportationId = rideId;
        try {
            const response = await request('POST', `/stations/cancel/${stopId}`, token, { transportationId });
            if (response.error) {
                console.error('Failed to cancel the station:', response.error);
            } else {
                console.log(response.message);
            }
        }
        catch (err) {
            console.error('Error occurred while cancel the station:', err);
        }

        //send message to passengers in this ride "התחנה {שם} בוטלה"

        const messageText = `נוסעים יקרים. הרינו להודיעכם כי בנסיעה שנרשמתם אליה בוטלה התחנה ${stopName}. במידה ונרשמתם לתחנה זו יש לשנות את הרישום.`; 
        const sendTime = new Date().toISOString();

        try {
            const response = await fetch(`${api}/messages/add/${rideId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ messageText, sendTime }),
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json(); // or response.text() depending on your API response
        
            console.log('Message added successfully:', data);
            // Perform other actions as needed after the message is successfully added
        
        } catch (error) {
            console.error('Error adding message:', error);
            // Handle the error, for example by showing a notification to the user
        }

        setDynamicStopsList(prevDynamicStopsList =>
            prevDynamicStopsList.filter(stop => stop.id !== stopId)
        );
        console.log(dynamicStopsList);
        console.log("Cancel stop ", stopId);
    }



    return (
        <div className="stops-father-con">
            <span style={{ fontSize: "22px", fontWeight: '700', color: "#FF914D" }}>תחנות</span>
            <div className="stops-container" style={{ marginTop: "10px" }}>
                {dynamicStopsList.map(stop => <div className="stop">
                    {stop.name}
                    {isAdmin ? <CancelIcon
                        onClick={() => handleCancelStop(stop.id, stop.name)}
                        sx={{
                            color: "red",
                            fontSize: "180%",
                            cursor: "pointer",
                            transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                            '&:hover': {
                                transform: "scale(1.1)", // Slightly grow the icon
                                color: "rgba(255, 0, 0, 0.7)", // Make the color a bit brighter
                            }
                        }} /> : null}
                </div>)}
                {isAdmin ? <div className="add-stop-button-container">
                    <button className="add-stop-button"
                        onClick={handleAddStop}
                        style={{
                        }}>
                        הוסף תחנה
                        <AddCircleIcon
                            sx={{
                                color: '#00bf63',
                                fontSize: '1.5em',
                            }} />
                    </button>

                </div> : null}
            </div>


        </div>
    )
}

export default Stops;