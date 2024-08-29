import React from "react";
// import '../../../style/AdminRideEdit.css'


const Passengers = ({ registers }) => {


    return (
        <div className="pass-father-con">
            <span style={{fontSize: "22px", fontWeight: '700', color: "#1F628E"}}>נוסעים</span>
        <div className="passenger-container" style={{marginTop: "10px"}}>
            <div className="pass-name">
                <div className="title">שם הנוסע</div>
                {registers.map(passenger => <div className="passenger">{passenger.name}</div>)}
            </div>
            <div className="pass-stations">
                <div className="title">תחנת עלייה/ירידה</div>
                {registers.map(passenger => <div className="passenger">{passenger.fromStation}/{passenger.toStation}</div>)}
            </div>
        </div>
        </div>
    )
}

export default Passengers;