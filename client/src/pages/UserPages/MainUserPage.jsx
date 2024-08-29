import React, { useState } from "react";
import NavBar from "../../layout/NavBar";
import "../../style/UserPage.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import MyRidePage from "./MyRidePage";
import RegisterPage from "./RegisterPage";
import InfoPage from "./InfoPage";
import ContactPage from "./ContactPage";
import MyMessagePage from "./MyMessagePage";
import { register } from "../../requests";


const MainUserPage = ({user}) => {

    const getMyRides = () => {
        //wait for server
        // rteurns only rides that not passed yet
        return [
            {
                rideId: 123,
                registerId: 1,
                toStation: "תחנה מרכזית ירושלים",
                fromStation: "תל אביב השלום",
                ExecutionDate: "2021-06-01",
                RegistrationsStatus: "active",
                Time: "08:00",
                Date: "2021-06-01",
                fromCity: "ירושלים",
                toCity: "תל אביב",
                RideStations: [{
                    name: "תחנה מרכזית ירושלים",
                    id: 1,
                    type: "Starting"
                },
                {
                    name: "תחנה מרכזית תל אביב",
                    id: 2,
                    type: "Destination"
                },
                {
                    name: "מחלף חמד",
                    id: 3,
                    type: "Intermediate"
                }
            ],
            },
            {
                id: 124,
                registerId: 2,
                toStation: "תחנה מרכזית תל אביב",
                fromStation: "תחנה מרכזית חיפה",
                ExecutionDate: "2021-06-01",
                RegistrationsStatus: "active",
                Time: "08:00",
                Date: "2021-06-01",
                fromCity: "חיפה",
                toCity: "תל אביב",
                RideStations: [
                    {
                        name: "תחנה מרכזית תל אביב",
                        id: 1,
                        type: "Destination"
                    },
                    {
                        name: "תחנה מרכזית חיפה",
                        id: 2,
                        type: "Starting"
                    },
                    {
                        name: "צומת מסובים",
                        id: 3,
                        type: "Intermediate"
                    }
                ],
            }
        ]
    }

    const myRides = getMyRides();

    const [navigateNum, setNavigateNum] = useState(0);

    return (
        <div>
            <NavBar navigateNum={navigateNum} setNavigateNum={setNavigateNum} />
            <div className="user-page-container">
                <Routes>
                    <Route path="/" element={<NavigateHandler navigateNum={navigateNum} />} />
                    <Route path="my-rides" element={<MyRidePage myRides={myRides} user={user}/>} />
                    <Route path="register-to-ride" element={<RegisterPage user={user}/>} />
                    <Route path="info" element={<InfoPage />} />
                    <Route path="contact" element={<ContactPage/>} />
                    <Route path="messages" element={<MyMessagePage user={user} rideIds={myRides.map(ride => ride.id)}/>} />
                </Routes>
            </div>
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