import React, {useState, useEffect} from "react";
const api = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

const InfoPage = ({userId}) => {

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

    const [allRides, setAllRides] = useState([]); // Store the full list of rides
    const [filteredRides, setFilteredRides] = useState({}); // Store the filtered rides by day

    const getAllRides = async () => {
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
                    fromCity: ride.stations.find(station => station.Station_Type === "Starting").City,
                    toCity: ride.stations.find(station => station.Station_Type === "Destination").City,
                    date: new Date(ride.Transportation_Date), // Store as a Date object
                    time: ride.Transportation_Time,
                }));

                setAllRides(myRideIn); // Store all rides
            } else {
                console.error('Request failed:', data.message);
                setAllRides([]);
            }

        } catch (error) {
            console.error('Error during request your ride:', error);
            setAllRides([]);
        }
    };

    const gatAllridesinThisDay = (day) => {
        return filteredRides[day] || [];
    };

    const today = new Date(); // Current date
    const startDate = new Date(today); // Start from today
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 6); // End date is the coming week

    useEffect(() => {
        getAllRides();
    }, []); // Only run on mount

    useEffect(() => {
        if (allRides.length > 0) {
            const grouped = allRides.reduce((acc, ride) => {
                const date = ride.date;
                const dayName = days[date.getDay()]; // Get the day of the week

                if (date >= startDate && date <= endDate) {
                    if (!acc[dayName]) {
                        acc[dayName] = [];
                    }
                    acc[dayName].push(ride); // Group the ride by the day
                }
                return acc;
            }, {});

            setFilteredRides(grouped); // Update the filtered rides list
        }
    }, [allRides]); // Run whenever allRides changes

    useEffect(() => {
        console.log('Filtered rides list:', filteredRides);
    }, [filteredRides]);
    

    return (
        <div className="user-page-container info-page">
            {allRides ? ( <div>
                        <div className="register-page-title">
                <span>לו"ז נסיעות לשבוע הקרוב</span>
            </div>
            <div className="info-schedule">
                {days.filter(day=> day!=="שבת").map(day => 
                <div className="day-container">
                <div className="day-title">
                    <span>{day}</span>
                </div>
                <div className="ride-in-day">
                {gatAllridesinThisDay(day).map(ride =>
                    <div className="ride-item">
                        <span>{(ride.time).slice(0, 5)}</span>
                        <span>{ride.fromCity} - {ride.toCity}</span>
                    </div>
                )}
                </div>
                </div>
                )} 
            </div>
            </div> ):(
                <p>Loading info...</p>)}
        </div>
    )
}

export default InfoPage;