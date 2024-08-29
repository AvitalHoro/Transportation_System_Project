import React from "react";
import Filters from "../../layout/Filters";
import RideItem from "./RideItem";

const RideGalleryPage = ({setEditOrGallery, setRide}) => {


    const getAllRides = () => {
       //wait for server
       return [
        {
            rideId: 123,
            time: "08:00",
            date: "2021-06-01",
            fromCity: "ירושלים",
            toCity: "תל אביב",
            status: "active",
            driverName: "אבי רבינוביץ'",
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
            Registers: [
                {
                    name: "אבי רבינוביץ'",
                    fromStation: "תחנה מרכזית חיפה",
                    toStation: "צומת מסובים",
                },
                {
                    name: "יסכה גדות",
                    fromStation: "תחנה מרכזית חיפה",
                    toStation: "צומת מסובים",
                },
                {
                    name: "אבי רבינוביץ'",
                    fromStation: "תחנה מרכזית קצרין",
                    toStation: "מחלף חמד",
                }

            ]
        },
        {
            id: 124,
            time: "08:00",
            date: "2021-06-01",
            fromCity: "חיפה",
            toCity: "תל אביב",
            status: "active",
            driverName: "אבי רון",
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
            Registers: [
                {
                    name: "אבי רבינוביץ'",
                    fromStation: "תחנה מרכזית חיפה",
                    toStation: "צומת מסובים",
                },
                {
                    name: "יסכה גדות",
                    fromStation: "תחנה מרכזית חיפה",
                    toStation: "צומת מסובים",
                },
            ],
        }
    ]
}

    const allRideList = getAllRides();

    return (
<div className="page-container register-page">
            <div className="register-page-title">
                <span>בחר את הנסיעה אותה ברצונך לערוך</span>
            </div>
            <Filters _color={"#FF914D"} />
            <div className="ride-gallery-content">
                {
                    allRideList.map((ride) =>
                        <RideItem
                    setEditOrGallery={setEditOrGallery}
                    setRide={setRide}
                           ride={ride}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default RideGalleryPage;