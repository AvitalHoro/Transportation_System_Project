import React, { useState, useEffect } from "react";
import RideItem from "./RideItem";
import Filters from "../../layout/Filters";
import RideViewPage from "./RideViewPage";
import { api } from "../../config.json";

const MainDriverPage = ({userId}) => {


    const [allRides, setAllRides] = useState(null); // Store the full list of rides
    const [filteredRides, setFilteredRides] = useState(null); // Store the filtered rides

    const [filterDate, setFilterDate] = useState("");
    const [filterToStation, setFilterToStation] = useState("");
    const [filterFromStation, setFilterFromStation] = useState("");

    const getMyRides = async () => {

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${api}/transportations/driver/${userId}`, {
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
                const myRideIn = data.transportations.map(ride => ({
                    rideId: ride.TransportationID,
                    fromCity: ride.StartStationCity,
                    toCity: ride.DestinationStationCity,
                    date: new Date(ride.Transportation_Date).toLocaleDateString(),
                    time: ride.Transportation_Time.slice(0, 5),
                    RideStations: ride.stations.map(station => ({
                        name: station.Address,
                        id: station.StationID,
                        type: station.Station_Type
                    })),
                    Registers: ride.passengers.map(
                        register => ({
                            name: register.Username,
                            fromStation: register.PickupStationAddress,
                            toStation: register.DropoffStationAddress,
                        })
                    )
                }));

                setAllRides(myRideIn); // Store all rides
                console.log('All rides:', myRideIn);
                setFilteredRides(myRideIn); // Initial filtering
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
        getMyRides();
    }, []); // Only run on mount

    useEffect(() => {
        if (allRides) {
            const filtered = allRides
                .filter(ride => {
                    return (
                        (ride.date === filterDate || filterDate === "") &&
                        (filterToStation === "" || ride.RideStations.find(station => station.name === filterToStation && station.type !== "Starting")) &&
                        (filterFromStation === "" || ride.RideStations.find(station => station.name === filterFromStation && station.type !== "Destination"))
                    );
                });
            setFilteredRides(filtered); // Update the filtered rides list
        }
    }, [filterToStation, filterFromStation, filterDate, allRides]); // Run whenever filters or allRides change

    console.log('Filtered rides list:', filteredRides);


    const [viewOrGallery, setViewOrGallery] = useState(0);
    const [ride, setRide] = useState({});

    return (
        <div style={{ padding: '1.5em' }}>
            {filteredRides?( <div>
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
                    {filteredRides.length > 0? (
                    <div className="ride-gallery-content">
                        {
                            filteredRides.map((ride) =>
                                <RideItem
                                    setViewOrGallery={setViewOrGallery}
                                    setRide={setRide}
                                    ride={ride}
                                />
                            )
                        }
                    </div>):(<p>אין לך נסיעות קרובות</p>)}
                </div>} </div>): <p>Loading rides...</p>}
        </div>
    )
}

export default MainDriverPage;