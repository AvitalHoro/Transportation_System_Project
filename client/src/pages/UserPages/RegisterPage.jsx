import React, {useState, useEffect} from "react";
import Filters from "../../layout/Filters";
import RideRegister from "./RideRegister";
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');


const RegisterPage = ({userId, myRidesIds}) => {


    const [allRides, setAllRides] = useState(null); // Store the full list of rides
    const [filteredRides, setFilteredRides] = useState(null); // Store the filtered rides

    const [filterDate, setFilterDate] = useState("");
    const [filterToStation, setFilterToStation] = useState("");
    const [filterFromStation, setFilterFromStation] = useState("");

    const getAllNextRides = async () => {
        try {
            const response = await fetch(`${api}/transportations/passenger/?userId=${userId}`, {
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
                const myRideIn = data.transportations.map(ride => ({
                    id: ride.TransportationID,
                    exit: ride.stations.find(station => station.Station_Type === "Starting").City,
                    target: ride.stations.find(station => station.Station_Type === "Destination").City,
                    date: new Date(ride.Transportation_Date).toLocaleDateString(),
                    time: ride.Transportation_Time,
                    stationsList: ride.stations.map(station => ({
                        name: station.Address,
                        id: station.StationID,
                        type: station.Station_Type
                    }))
                }));

                setAllRides(myRideIn); // Store all rides
                setFilteredRides(myRideIn.filter(ride => !myRidesIds.includes(ride.id))); // Initial filtering
            } else {
                console.error('Request failed:', data.message);
                setAllRides([]);
            }
    
        } catch (error) {
            console.error('Error during request your ride: ', error);
            setAllRides([]);
        }
    };

    useEffect(() => {
        getAllNextRides();
    }, []); // Only run on mount

    useEffect(() => {
        if (allRides) {
            const filtered = allRides
                .filter(ride => !myRidesIds.includes(ride.id))
                .filter(ride => {
                    return (
                        (ride.date === filterDate || filterDate === "") &&
                        (filterToStation === "" || ride.stationsList.find(station => station.name === filterToStation && station.type !== "Starting")) &&
                        (filterFromStation === "" || ride.stationsList.find(station => station.name === filterFromStation && station.type !== "Destination"))
                    );
                });
            setFilteredRides(filtered); // Update the filtered rides list
        }
    }, [filterToStation, filterFromStation, filterDate, allRides]); // Run whenever filters or allRides change

    console.log('Filtered rides list:', filteredRides);

    // const getAllNextRides = () => {
    //     //wait for server
    //     //return only rides that not passed yet
    //     //return only ride not in myRidesIds!!!!!!
    //     return [
    //         {
    //             id: 1234,
    //             exit: "תל אביב",
    //             target: "ירושלים",
    //             date: "2021-06-01",
    //             time: "08:00",
    //             stationsList: [
    //                 {
    //                     name: "תחנה מרכזית תל אביב",
    //                     id: 1,
    //                     type: "Starting"
    //                 },
    //                 {
    //                     name: "תחנה מרכזית ירושלים",
    //                     id: 2,
    //                     type: "Destination"
    //                 },
    //                 {
    //                     name: "מחלף חמד",
    //                     id: 3,
    //                     type: "Intermediate"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 456,
    //             exit: "חיפה",
    //             target: "קצרין",
    //             date: "2024-06-01",
    //             time: "16:30",
    //             stationsList: [
    //                 {
    //                     name: "תחנה מרכזית חיפה",
    //                     id: 1,
    //                     type: "Starting"
    //                 },
    //                 {
    //                     name: "תחנה מרכזית קצרין",
    //                     id: 2,
    //                     type: "Destination"
    //                 },
    //                 {
    //                     name: "צומת מסובים",
    //                     id: 3,
    //                     type: "Intermediate"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 789,
    //             exit: "תל אביב",
    //             target: "חיפה",
    //             date: "2021-06-01",
    //             time: "08:00",
    //             stationsList: [
    //                 {
    //                     name: "תחנה מרכזית תל אביב",
    //                     id: 1,
    //                     type: "Starting"
    //                 },
    //                 {
    //                     name: "תחנה מרכזית חיפה",
    //                     id: 2,
    //                     type: "Destination"
    //                 },
    //                 {
    //                     name: "צומת מסובים",
    //                     id: 3,
    //                     type: "Intermediate"
    //                 }
    //             ]
    //         },

    //     ];
    // }

   

    // const allRideList = getAllNextRides().filter(ride => {
    //     return (
    //         (ride.date === filterDate || filterDate === "") &&
    //         (filterToStation === "" || ride.stationsList.find(station => station.name === filterToStation && station.type !== "Starting")) &&
    //         (filterFromStation === "" || ride.stationsList.find(station => station.name === filterFromStation && station.type !== "Destination"))
    //     );
    // });

    
    return (
        <div className="register-page">
            {filteredRides? ( <div>
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
                    filteredRides.map((ride) =>
                        <RideRegister
                        userId={userId}
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
            ):(
                <p>Loading rides...</p>)}
        </div>
    )
}

export default RegisterPage;