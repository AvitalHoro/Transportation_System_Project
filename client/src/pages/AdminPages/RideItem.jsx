import React, {useState} from "react";
import "../../style/RideRegister.css";
import "../../style/RideItem.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AdminOptions from "./AdminRideOptions";

const RideItem = ({ride, setRide, setEditOrGallery, userId}) => {

    const [rideStatus, setRideStatus] = useState(ride.status);

    return (
        <div className="ride-item-container" style={{
            border: rideStatus==="active"? "" : "rgb(237, 29, 43) 4px solid" }}>
                <div className="details-container">
                    <div className="detail">
                        <ArrowCircleLeftIcon style={{ color: "#FF914D" }} />
                        {/* <img src="./icons/direction-icon.png"></img> */}
                        <span style={{ fontWeight: 'bold', color: "#FF914D", fontSize: "18px" }}>מ{ride.fromCity} ל{ride.toCity}</span>
                    </div>
                    <div className="detail">
                        <PersonIcon style={{ color: "#FF914D" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>{ride.driverName}</span>
                    </div>
                    <div className="detail">
                        <PeopleIcon style={{ color: "#FF914D" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>{ride.Registers.length} רשומים</span>
                    </div>
                    <div className="detail">
                        <CalendarMonthIcon style={{ color: "#FF914D" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>{ride.date}</span>
                    </div>
                    <div className="detail">
                        {/* <ScheduleIcon style={{ color: "#FF914D" }} /> */}
                        {/* <img src="./icons/time-icon.png"></img> */}
                        <span style={{color: "#FF914D", fontSize: "22px"}}>{ride.time}</span>
                    </div>

                </div>

            <AdminOptions 
            setEditOrGallery={setEditOrGallery} 
            setRide={setRide} 
            ride={ride}
            rideStatus={rideStatus}
            setRideStatus={setRideStatus} 
            userId={userId}/>

        </div>

    )
}

export default RideItem;