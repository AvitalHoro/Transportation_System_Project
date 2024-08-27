import React from "react";
// import '../../../style/AdminRideEdit.css'


const Passengers = ({rideId}) => {

    const getRidePassengers = (rideId) => {
        return [
            {
                name: "רוני כהן",
                toStation: "ארלוזורוב",
                fromStation: "קרית אונו"
            },
            {
                name: "דני כהן",
                toStation: "מרכזית המפרץ",
                fromStation: "צומת בית קמה"
            }
        ]

    }

    const passengers = getRidePassengers(rideId);


    return (
        <div className="pass-father-con">
            <span style={{fontSize: "22px", fontWeight: '700', color: "#FF914D"}}>נוסעים</span>
        <div className="passenger-container" style={{marginTop: "10px"}}>
            <div className="pass-name">
                <div className="title">שם הנוסע</div>
                {passengers.map(passenger => <div className="passenger">{passenger.name}</div>)}
            </div>
            <div className="pass-stations">
                <div className="title">תחנת עלייה/ירידה</div>
                {passengers.map(passenger => <div className="passenger">{passenger.fromStation}/{passenger.toStation}</div>)}
            </div>
        </div>
        </div>
    )
}

export default Passengers;