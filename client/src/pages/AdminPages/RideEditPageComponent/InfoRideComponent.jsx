import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import '../../../style/AdminRideEdit.css'



const InfoRideComponent = ({ ride }) => {

    ride = {
            exit: "תל אביב",
            target: "ירושלים",
            date: "2021-06-01",
            time: "08:00",
            seats: 30,
            price: 30,
            driver: "דוד כהן",
            registerNum: "12",
        }

    return (
        <div className="info-details-container">
            <div className="info-horizonal-container" style={{marginBottom: '10px'}}>
                <div className="detail">
                    <ArrowCircleLeftIcon style={{ color: "#FF914D", fontSize: '2rem' }} />
                    {/* <img src="./icons/direction-icon.png"></img> */}
                    <span style={{ fontWeight: 'bold', color: "#FF914D", fontSize: "1.5rem" }}>מ{ride.exit} ל{ride.target}</span>
                </div>
                <div className="detail">
                    {/* <ScheduleIcon style={{ color: "#FF914D" }} /> */}
                    {/* <img src="./icons/time-icon.png"></img> */}
                    <span style={{ color: "#FF914D", fontSize: "2rem" }}>{ride.time}</span>
                </div>
            </div>
            <div className="info-horizonal-container">
                <div className="detail">
                    <PersonIcon style={{ color: "#FF914D", fontSize: '1.5rem' }} />
                    {/* <img src="./icons/date-icon.png"></img> */}
                    <span>{ride.driver}</span>
                </div>
                <div className="detail">
                    <PeopleIcon style={{ color: "#FF914D", fontSize: '1.5rem' }} />
                    {/* <img src="./icons/date-icon.png"></img> */}
                    <span>{ride.registerNum} רשומים</span>
                </div>
                <div className="detail">
                    <CalendarMonthIcon style={{ color: "#FF914D", fontSize: '1.5rem' }} />
                    {/* <img src="./icons/date-icon.png"></img> */}
                    <span>{ride.date}</span>
                </div>
            </div>


        </div>
    )
}

export default InfoRideComponent;