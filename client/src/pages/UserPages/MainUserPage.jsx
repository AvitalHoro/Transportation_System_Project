import React, { useState, useEffect } from "react";
import NavBar from "../../layout/NavBar";
import "../../style/UserPage.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import MyRidePage from "./MyRidePage";
import RegisterPage from "./RegisterPage";
import InfoPage from "./InfoPage";
import ContactPage from "./ContactPage";
import MyMessagePage from "./MyMessagePage";
import { register } from "../../requests";
import ProfilePopUp from "./ProfilePopUp";
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');


const MainUserPage = ({user, openProfilePopUp}) => {

    const [myRides, setMyRides] = useState(null);
    const [registerUpdate, setRegisterUpdate] = useState(false);


    const getMyRides = async () => {
        try {
            const response = await fetch(`${api}/transportations/passenger/registration?userId=${user.UserID}`, {
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
    
            if (data.transportations) {
                console.log('my ride:', data.transportations);
                
                const myRideIn = data.transportations.map(ride => {
                    return {
                        rideId: ride.TransportationID,
                        toStation: ride.DropoffStationAddress,
                        fromStation: ride.PickupStationAddress,
                        RegistrationsStatus: ride.Registration_Status,
                        Time: ride.Transportation_Time,
                        Date: new Date(ride.Transportation_Date).toLocaleDateString(),  // Changed to full date
                        fromCity: ride.StartStationCity,
                        toCity: ride.DestinationStationCity,
                        RideStations: ride.stations.map(station => {
                            return {
                                name: station.Address,
                                id: station.StationID,
                                type: station.Station_Type
                            };
                        })
                    };
                });

                return myRideIn;
            } else {
                console.error('Request failed:', data.message);
                return null;
            }
    
        } catch (error) {
            console.error('Error during request your ride: ', error);
            return null;
        }
    };

    useEffect(() => {
        getMyRides().then(rides => {
            setMyRides(rides);
            console.log('my rides in effect:', rides);
        });
    }, [registerUpdate]); // Empty dependency array means this effect runs once on mount

    console.log('my rides in finish:', myRides); // This might log `null` initially, before state updates


    const [navigateNum, setNavigateNum] = useState(0);

    return (
        <div>
            {myRides ? (
                <div>
            <NavBar navigateNum={navigateNum} setNavigateNum={setNavigateNum} />
            {openProfilePopUp? <ProfilePopUp user={user}/> : null}
            <div className="user-page-container">
                <Routes>
                    <Route path="/" element={<NavigateHandler navigateNum={navigateNum} />} />
                    <Route path="my-rides" element={<MyRidePage myRides={myRides} user={user}/>} />
                    <Route path="register-to-ride" element={<RegisterPage myRidesIds={myRides? myRides.map(ride => ride.id) : null} userId={user? user.UserID: null} registerUpdate={registerUpdate} setRegisterUpdate={setRegisterUpdate}/>} />
                    <Route path="info" element={<InfoPage userId={user.UserID} />} />
                    <Route path="contact" element={<ContactPage/>} />
                    <Route path="messages" element={<MyMessagePage user={user} rideIds={myRides? myRides.map(ride => ride.rideId): null}/>} />
                </Routes>
            </div>
            </div>
        ) : (
                <p>Loading rides...</p>
            )}
        </div> 
    )
}

const NavigateHandler = ({navigateNum}) => {
    switch(navigateNum) {
        case 0:
            return <Navigate to="/home/user/my-rides" />
        case 1:
            return <Navigate to="/home/user/register-to-ride" />
        case 2:
            return <Navigate to="/home/user/info" />
        case 3:
            return <Navigate to="/home/user/contact" />
        case 4:
            return <Navigate to="/home/user/messages" />
    }
}

export default MainUserPage;