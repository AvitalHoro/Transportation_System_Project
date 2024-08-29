import React from "react";

const InfoPage = () => {

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];

    const groupedRides = {
        'ראשון': [], 
        'שני': [], 
        'שלישי': [], 
        'רביעי': [], 
        'חמישי': [], 
        'שישי': []
    };

    

    const getAllRides = () => {
        //wait for server
        return [
            {
                fromCity: "אילת",
                toCity: "תל אביב",
                date: "2024-08-30",
                time: "08:00"
            },
            {
                fromCity: "תל אביב",
                toCity: "אילת",
                date: "2024-09-02",
                time: "17:00"
            },

        ]
    }

    const gatAllridesinThisDay = (day) => {
        return groupedRides[day];
    }

    const allRides = getAllRides();

    const today = new Date(); // Current date
    const todayDayOfWeek = today.getDay(); // Current day of the week (0 = Sunday, 6 = Saturday)
    
    // Calculate the date range for the coming week
    const startDate = new Date(today); // Start from today
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 6); // End date is the coming Tuesday
    console.log(startDate, endDate);

    allRides.forEach(ride => {
        const date = new Date(ride.date); // Parse the date
        const dayName = days[date.getDay()]; // Get the day of the week

        if (date >= startDate && date <= endDate) {
        groupedRides[dayName].push(ride); // Push the ride into the appropriate array
    }});

    return (
        <div className="user-page-container info-page">
                        <div className="register-page-title">
                <span>לו"ז נסיעות לשבוע הקרוב</span>
            </div>
            <div className="info-schedule">
                {days.map(day => 
                <div className="day-container">
                <div className="day-title">
                    <span>{day}</span>
                </div>
                <div className="ride-in-day">
                {gatAllridesinThisDay(day).map(ride =>
                    <div className="ride-item">
                        <span>{ride.time}</span>
                        <span>{ride.fromCity} - {ride.toCity}</span>
                    </div>
                )}
                </div>
                </div>
                )} 
            </div>
        </div>
    )
}

export default InfoPage;