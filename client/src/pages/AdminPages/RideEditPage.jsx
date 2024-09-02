import React, { useState, useEffect } from "react";
import InfoRideComponent from "./RideEditPageComponent/InfoRideComponent";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReplaceDriver from "./RideEditPageComponent/ReplaceDriver";
import Passengers from "./RideEditPageComponent/Passengers";
import Stops from "./RideEditPageComponent/Stops";
import SendMessegeToPassengers from "./RideEditPageComponent/SendMessegeToPassengers";
import AddStationPopUp from "./RideEditPageComponent/AddStationPopUp";
import { request } from '../../requests';
import { api } from '../../config.json';


const RideEditPage = ({ ride, setEditOrGallery, setDriverUpdate }) => {
    console.log(ride);

    const [stationsList, setStationsList] = useState(null);
    const [stationsListWithId, setStationsListWithId] = useState(null);

    const getStationsList = async () => {
        //wait for server
        const token = localStorage.getItem('token'); 
        try {
            const response = await request('GET', '/stations/all/', token);
    
            if (response.error) {
                console.error('Failed to return the stations:', response.error);
            } else {
                console.log(response.stations);
                setStationsListWithId(response.stations.map(station => ({
                    name: station.Address,
                    id: station.StationID,
                })));
                setStationsList(response.stations.map(station => station.Address));
            }
        } catch (err) {
            console.error('Error occurred while return the stations:', err);
        }
    }


    const handleAddStation = async (stationName) => {
        const token = localStorage.getItem('token'); 

        const stationId = stationsListWithId.find(sat => sat.name === stationName).id;


        if(stationId === undefined){
            alert("תחנה לא תקינה");
            return;
        }

        if(ride.stationsList.find(station => station.id === stationId)){
            alert("תחנה כבר קיימת בנסיעה");
            return;
        }

        const rideId = ride.id;


        //wait for server
        //add station to ride, type is intermediate
        const station_type = "Intermediate";

        try {
            const response = await fetch(`${api}/stations/add/${rideId}/${stationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    station_type
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log("Added station", stationId);
            }
        } catch (error) {
            console.error('Error during request to add station:', stationId, error);
        }

        //send message to passengers in this ride "התחנה {שם} נוספה לנסיעה"
        const messageText = `נוסעים יקרים שלום וברכה. הרינו להודיעכם כי נוספה התחנה ${stationName} לנסיעה. נשמח לראותכם בנסיעה.`; 
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
        

        setDynamicStopsList([...dynamicStopsList, { id: stationId, name: stationName, type: "Intermediate" }]);

        console.log("Add station: ", stationName, stationId);
        console.log(dynamicStopsList);
    }

    useEffect(() => {
        getStationsList();
    }, []);

    const [dynamicStopsList, setDynamicStopsList] = React.useState(ride.stationsList);

    const [openStationsPopUp, setOpenStationsPopUp] = React.useState(false);

    const [rideStatus, setRideStatus] = React.useState(ride.status);


    //setOpenPopUpStation, stationsList, setStopsList, isEditPage, handleAddStation
    return (
        <div>
            { stationsList? (
        <div className="page-container ride-edit-page">
            {openStationsPopUp? 
            <AddStationPopUp 
            rideId={ride.id} 
            setOpenPopUpStation={setOpenStationsPopUp} 
            stationsList={stationsList}
            setStopsList={setDynamicStopsList}
            isEditPage={true}
            handleAddStation={handleAddStation}
            /> 
            : null}
            <div className="top-ride-edit-container">
                <div className="ride-edit-title">
                    <span>אלה פרטי הנסיעה המבוקשת:</span>
                </div>
                <div className="back-to-rides-list-button"
                onClick={()=> setEditOrGallery(0)}>
                    <span>חזור לרשימת הנסיעות</span>
                    <div className="circle-icon">
                        <ArrowBackIosIcon sx={{
                            marginLeft: "7.5px",
                            marginTop: "4.5px",
                            color: 'white',
                        }}/>
                    </div>
                </div>
            </div>
            <div className="ride-edit-main" style={{border: rideStatus==="active"? "" : "rgb(237, 29, 43) 4px solid" }}>
                <div className="top-ride-edit-main">
                <InfoRideComponent ride={ride} _color={"#FF914D"}/>
                <ReplaceDriver setDriverUpdate={setDriverUpdate} driverName={ride.driverName} rideId={ride.id} />
                </div>
                <div className="bottom-ride-edit-main">
                <Passengers registers={ride.Registers} />
                <Stops 
                rideId={ride.id}
                stops={ride.stationsList} 
                isAdmin={true} 
                setOpenStationsPopUp={setOpenStationsPopUp} 
                dynamicStopsList={dynamicStopsList} 
                setDynamicStopsList={setDynamicStopsList}
                />
                <SendMessegeToPassengers rideId={ride.id} isAdmin={true} setRideStatus={setRideStatus} rideStatus={rideStatus} />
                </div>
            </div>
        </div>
            ) : <p>loading...</p>}
        </div>
    )
}

export default RideEditPage;