import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import '../../../style/AdminRideEdit.css'



const InfoRideComponent = ({ ride, _color }) => {

    return (
        <div className="info-details-container">
            <div className="info-horizonal-container" style={{marginBottom: '10px'}}>
                <div className="detail">
                    <ArrowCircleLeftIcon style={{ color: _color, fontSize: '2rem' }} />
                    {/* <img src="./icons/direction-icon.png"></img> */}
                    <span style={{ fontWeight: 'bold', color: _color, fontSize: "1.5rem" }}>מ{ride.fromCity} ל{ride.toCity}</span>
                </div>
                <div className="detail">
                    {/* <ScheduleIcon style={{ color: _color }} /> */}
                    {/* <img src="./icons/time-icon.png"></img> */}
                    <span style={{ color: _color, fontSize: "2rem" }}>{ride.time}</span>
                </div>
            </div>
            <div className="info-horizonal-container">
                <div className="detail">
                    <PersonIcon style={{ color: _color, fontSize: '1.5rem' }} />
                    {/* <img src="./icons/date-icon.png"></img> */}
                    <span>{ride.driver? ride.driver: "אתה הנהג"}</span>
                </div>
                <div className="detail">
                    <PeopleIcon style={{ color: _color, fontSize: '1.5rem' }} />
                    {/* <img src="./icons/date-icon.png"></img> */}
                    <span>{ride.Registers.length} רשומים</span>
                </div>
                <div className="detail">
                    <CalendarMonthIcon style={{ color: _color, fontSize: '1.5rem' }} />
                    {/* <img src="./icons/date-icon.png"></img> */}
                    <span>{ride.date}</span>
                </div>
            </div>


        </div>
    )
}

export default InfoRideComponent;