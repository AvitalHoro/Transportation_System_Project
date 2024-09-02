import React, { useState, useEffect } from "react";
import Filters from "../../layout/Filters";
import RideItem from "./RideItem";
import MessegesPopUp from "../MessegesPopUp";
import ReplaceDriver from "./RideEditPageComponent/ReplaceDriver";
import { Cancel } from "@mui/icons-material";
import '../../style/popUp.css';
import { api } from "../../config.json";
import { register } from "../../requests";

const ReplaceDriverPopUp = ({ setReplaceDriverIsClicked, rideId, driverName, setDriverUpdate }) => {

    return (
        <div className="popup">
            <div className="popup-message-container">
                <Cancel className="close-button" onClick={() => setReplaceDriverIsClicked(false)} />
                <ReplaceDriver rideId={rideId} isInPopUp={true} driverName={driverName} setDriverUpdate={setDriverUpdate} />
                {/* <div className="popup-add-sat-buttons"
                onClick={handleReplceDriver}>
                    אישור
                </div> */}
            </div>
        </div>
    )
}

const RideGalleryPage = ({ setEditOrGallery, ride, setRide, userId, driverUpdate, setDriverUpdate }) => {



    // id: 123,
    // time: "08:00",
    // date: "2021-06-01",
    // fromCity: "ירושלים",
    // toCity: "תל אביב",
    // status: "active",
    // driverName: "אבי רבינוביץ'",
    // RideStations: [{
    //     name: "תחנה מרכזית ירושלים",
    //     id: 1,
    //     type: "Starting"
    // },

    const [allRides, setAllRides] = useState(null); // Store the full list of rides
    const [filteredRides, setFilteredRides] = useState(null); // Store the filtered rides

    const [filterDate, setFilterDate] = useState("");
    const [filterToStation, setFilterToStation] = useState("");
    const [filterFromStation, setFilterFromStation] = useState("");

    const getAllNextRides = async () => {

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${api}/transportations/all`, {
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
                    id: ride.TransportationID,
                    fromCity: ride.StartCity,
                    toCity: ride.DestinationCity,
                    date: new Date(ride.Transportation_Date).toLocaleDateString(),
                    time: ride.Transportation_Time,
                    status: ride.Transportation_Status,
                    driverName: ride.DriverName,
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
        getAllNextRides();
    }, [driverUpdate]); // Only run on mount

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

    console.log('ride-date', ride.date, " ", filterDate);


    const [messegesIsClicked, setMessegesIsClicked] = useState(false);
    const [replaceDriverIsClicked, setReplaceDriverIsClicked] = useState(false);



    return (
        <div className="page-container register-page">
            {filteredRides ? (
                <div>
                    {messegesIsClicked ? <MessegesPopUp setMessegesIsClicked={setMessegesIsClicked} userId={userId} rideId={ride.id} /> : null}
                    {replaceDriverIsClicked ? <ReplaceDriverPopUp setDriverUpdate={setDriverUpdate} setReplaceDriverIsClicked={setReplaceDriverIsClicked} rideId={ride.id} driverName={ride.driverName} /> : null}
                    <div className="register-page-title">
                        <span>בחר את הנסיעה אותה ברצונך לערוך</span>
                    </div>
                    <Filters _color={"#FF914D"}
                        setFilterDate={setFilterDate}
                        setFilterToStation={setFilterToStation}
                        setFilterFromStation={setFilterFromStation} />
                    <div className="ride-gallery-content">
                        {
                            filteredRides
                            .sort((a, b) => new Date(a.Transportation_Date) - new Date(b.Transportation_Date))
                            .map((ride) =>
                                <RideItem
                                    setEditOrGallery={setEditOrGallery}
                                    setRide={setRide}
                                    ride={ride}
                                    userId={userId}
                                    setMessegesIsClicked={setMessegesIsClicked}
                                    setReplaceDriverIsClicked={setReplaceDriverIsClicked}
                                />
                            )
                        }
                    </div>
                </div>) : (
                <p>Loading rides...</p>
            )}
        </div>
    )
}

export default RideGalleryPage;