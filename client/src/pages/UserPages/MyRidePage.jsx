import React from "react";
import MyRideItem from "./MyRideItem";

const MyRidePage = () => {

    const getMyRides = () => {
        return [
            {
                toStation: "תחנה מרכזית ירושלים",
                fromStation: "תל אביב השלום",
                ExecutionDate: "2021-06-01",
                RegistrationsStatus: "active",
                Time: "08:00",
                Date: "2021-06-01",
                from: "תל אביב",
                to: "ירושלים",
            }
        ]
    }

    const myRides = getMyRides();

    return (
        <div className="page-container">

            <div className="my-ride-container">
                <span>הנסיעות שלי</span>
                <div className="my-ride-gallery">
                    myRides.map(ride => {
                        <MyRideItem ride={ride} />
                </div>

            </div>

            <div className="general-messege-container">

            </div>

            <div className="ride-messege-container">
            
            </div>
            
        </div>
    )
}

export default MyRidePage;