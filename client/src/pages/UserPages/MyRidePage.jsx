import React from "react";
import MyRideItem from "./MyRideItem";
import MymessagePage from "./MyMessagePage";
import { useMediaQuery } from '@mui/material';

const MyRidePage = () => {

    const getMyRides = () => {
        return [
            {
                id: 123,
                toStation: "תחנה מרכזית ירושלים",
                fromStation: "תל אביב השלום",
                ExecutionDate: "2021-06-01",
                RegistrationsStatus: "active",
                Time: "08:00",
                Date: "2021-06-01",
                from: "תל אביב",
                to: "ירושלים",
            },
            {
                id: 124,
                toStation: "תחנה מרכזית תל אביב",
                fromStation: "תחנה מרכזית חיפה",
                ExecutionDate: "2021-06-01",
                RegistrationsStatus: "active",
                Time: "08:00",
                Date: "2021-06-01",
                from: "חיפה",
                to: "תל אביב",
            }
        ]
    }

    const myRides = getMyRides();
    const isComputerScreen = useMediaQuery('(min-width:730px)');



    return (
        <div className="user-page-container my-ride-page">

            <div className="my-ride-container" style={{width: isComputerScreen? '60%': '100%'}}>
                <div className="my-ride-title">
                <span>הנסיעות שלי</span>
                </div>
                <div className="my-ride-gallery">
                    {myRides.map(ride => <MyRideItem 
                        exit={ride.fromStation}
                        target={ride.toStation}
                        date={ride.Date}
                        time={ride.Time}
                        status={ride.RegistrationsStatus}
                        toStation={ride.to}
                        fromStation={ride.from}/>)}
                </div>

            </div>
            
            {isComputerScreen && (
                <div className="my-message-container">
            <MymessagePage rideIds={myRides.map(ride => ride.id)} />
            </div>
        )}

        </div>
    )
}

export default MyRidePage;