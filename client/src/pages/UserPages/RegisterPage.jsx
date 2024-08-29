import React from "react";
import Filters from "../../layout/Filters";
import RideRegister from "./RideRegister";

const RegisterPage = () => {

    const getAllNextRides = () => {
        //wait for server
        return [
            {
                id: 1234,
                exit: "תל אביב",
                target: "ירושלים",
                date: "2021-06-01",
                time: "08:00",
                stationsList: [
                    {
                        name: "תחנה מרכזית תל אביב",
                        id: 1,
                        type: "Starting"
                    },
                    {
                        name: "תחנה מרכזית ירושלים",
                        id: 2,
                        type: "Destination"
                    },
                    {
                        name: "מחלף חמד",
                        id: 3,
                        type: "Intermediate"
                    }
                ]
            },
            {
                id: 456,
                exit: "חיפה",
                target: "קצרין",
                date: "2024-06-01",
                time: "16:30",
                stationsList: [
                    {
                        name: "תחנה מרכזית חיפה",
                        id: 1,
                        type: "Starting"
                    },
                    {
                        name: "תחנה מרכזית קצרין",
                        id: 2,
                        type: "Destination"
                    },
                    {
                        name: "צומת מסובים",
                        id: 3,
                        type: "Intermediate"
                    }
                ]
            },
            {
                id: 789,
                exit: "תל אביב",
                target: "חיפה",
                date: "2021-06-01",
                time: "08:00",
                stationsList: [
                    {
                        name: "תחנה מרכזית תל אביב",
                        id: 1,
                        type: "Starting"
                    },
                    {
                        name: "תחנה מרכזית חיפה",
                        id: 2,
                        type: "Destination"
                    },
                    {
                        name: "צומת מסובים",
                        id: 3,
                        type: "Intermediate"
                    }
                ]
            },

        ];
    }

    const [filterDate, setFilterDate] = React.useState("");
    const [filterToStation, setFilterToStation] = React.useState("");
    const [filterFromStation, setFilterFromStation] = React.useState("");

    const allRideList = getAllNextRides().filter(ride => {
        return (
            (ride.date === filterDate || filterDate === "") &&
            (filterToStation === "" || ride.stationsList.find(station => station.name === filterToStation && station.type !== "Starting")) &&
            (filterFromStation === "" || ride.stationsList.find(station => station.name === filterFromStation && station.type !== "Destination"))
        );
    });

    console.log(allRideList);
    
    return (
        <div className="register-page">
            <div className="register-page-title">
                <span>בחר את הנסיעה אליה אתה רוצה להירשם</span>
            </div>
            <Filters _color={"#50BB82"}
                setFilterDate={setFilterDate}
                setFilterToStation={setFilterToStation}
                setFilterFromStation={setFilterFromStation}
            />
            <div className="register-page-content">
                {
                    allRideList.map((ride) =>
                        <RideRegister
                            rideId={ride.id}
                            exit={ride.exit}
                            target={ride.target}
                            date={ride.date}
                            time={ride.time}
                            stationsList={ride.stationsList}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default RegisterPage;