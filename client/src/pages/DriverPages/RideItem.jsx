import React from "react";
import "../../style/RideRegister.css";
import "../../style/RideItem.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
 

const RideItem = ({ride, setRide, setViewOrGallery}) => {

    // const ride = {
    //     exit: "תל אביב",
    //     target: "ירושלים",
    //     date: "2021-06-01",
    //     time: "08:00",
    //     seats: 30,
    //     price: 30,
    //     driver: "דוד כהן",
    //     registerNum: "12",
    // }
    return (
        <div className="ride-item-container" style={{cursor: 'pointer'}}
        onClick={()=>{setRide(ride); setViewOrGallery(1);}}>
                <div className="details-container" style={{width: '100%'}}>
                    <div className="detail">
                        <ArrowCircleLeftIcon style={{ color: "#1F628E" }} />
                        {/* <img src="./icons/direction-icon.png"></img> */}
                        <span style={{ fontWeight: 'bold', color: "#1F628E", fontSize: "18px" }}>מ{ride.fromCity} ל{ride.toCity}</span>
                    </div>
                    <div className="detail">
                        <PersonIcon style={{ color: "#1F628E" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>אתה הנהג</span>
                    </div>
                    <div className="detail">
                        <PeopleIcon style={{ color: "#1F628E" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>{ride.Registers.length} רשומים</span>
                    </div>
                    <div className="detail">
                        <CalendarMonthIcon style={{ color: "#1F628E" }} />
                        {/* <img src="./icons/date-icon.png"></img> */}
                        <span>{ride.date}</span>
                    </div>
                    <div className="detail">
                        {/* <ScheduleIcon style={{ color: "#1F628E" }} /> */}
                        {/* <img src="./icons/time-icon.png"></img> */}
                        <span style={{color: "#1F628E", fontSize: "22px"}}>{ride.time}</span>
                    </div>

                </div>
        </div>

    )
}

export default RideItem;