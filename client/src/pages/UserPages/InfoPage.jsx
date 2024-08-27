import React from "react";

const InfoPage = () => {

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];

    const gatAllridesinThisDay = (day) => {
        return [
            {
                from: "אילת",
                to: "תל אביב",
                time: "08:00"
            },
            {
                from: "תל אביב",
                to: "אילת",
                time: "17:00"
            },

        ]
    }

    return (
        <div className="user-page-container info-page">
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
                        <span>{ride.from} - {ride.to}</span>
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