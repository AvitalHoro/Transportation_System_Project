import React, { useState } from "react";
import RideItem from "./RideItem";
import Filters from "../../layout/Filters";
import RideViewPage from "./RideViewPage";
import Register from "../Register";

const MainDriverPage = () => {


    const getMyRides = () => {

        //wait for server
        return [
            {
                rideId: 123,
                time: "08:00",
                date: "2021-06-01",
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

    const [filterDate, setFilterDate] = React.useState("");
    const [filterToStation, setFilterToStation] = React.useState("");
    const [filterFromStation, setFilterFromStation] = React.useState("");

    const myRideList = getMyRides().filter(ride => {
        return (
            (ride.date === filterDate || filterDate === "") &&
            (filterToStation === "" || ride.RideStations.find(station => station.name === filterToStation && station.type !== "Starting")) &&
            (filterFromStation === "" || ride.RideStations.find(station => station.name === filterFromStation && station.type !== "Destination"))
        );
    });


    const [viewOrGallery, setViewOrGallery] = useState(0);
    const [ride, setRide] = useState({});

    return (
        <div style={{ padding: '1.5em' }}>

            {viewOrGallery ?
                <RideViewPage
                    ride={ride}
                    setViewOrGallery={setViewOrGallery}
                /> :
                <div style={{ padding: '1.5em' }}>
                    <div className="register-page-title">
                        <span>לחץ על נסיעה כדי לראות פרטים נוספים</span>
                    </div>
                    <Filters _color={"#1F628E"}
                        setFilterDate={setFilterDate}
                        setFilterToStation={setFilterToStation}
                        setFilterFromStation={setFilterFromStation}
                    />
                    <div className="ride-gallery-content">
                        {
                            myRideList.map((ride) =>
                                <RideItem
                                    setViewOrGallery={setViewOrGallery}
                                    setRide={setRide}
                                    ride={ride}
                                />
                            )
                        }
                    </div>
                </div>}
        </div>
    )
}

export default MainDriverPage;