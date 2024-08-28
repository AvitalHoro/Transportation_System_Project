import React from "react";
import InfoRideComponent from "./RideEditPageComponent/InfoRideComponent";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReplaceDriver from "./RideEditPageComponent/ReplaceDriver";
import Passengers from "./RideEditPageComponent/Passengers";
import Stops from "./RideEditPageComponent/Stops";
import SendMessegeToPassengers from "./RideEditPageComponent/SendMessegeToPassengers";

const RideEditPage = ({ ride, setEditOrGallery }) => {
    return (
        <div className="page-container ride-edit-page">
            <div className="top-ride-edit-container">
                <div className="ride-edit-title">
                    <span>אלה פרטי הנסיעה המבוקשת:</span>
                </div>
                <div className="back-to-rides-list-button"
                onClick={()=> setEditOrGallery(0)}>
                    <span>חזור לרשימת הנסיעות</span>
                    <div className="circle-icon">
                        <ArrowBackIosIcon sx={{
                            marginLeft: "7.5px",
                            marginTop: "4.5px",
                            color: 'white',
                        }}/>
                    </div>
                </div>
            </div>
            <div className="ride-edit-main">
                <div className="top-ride-edit-main">
                <InfoRideComponent ride={ride} _color={"#FF914D"}/>
                <ReplaceDriver rideId={ride.id} />
                </div>
                <div className="bottom-ride-edit-main">
                <Passengers rideId={ride.id} />
                <Stops rideId={ride.id} isAdmin={true} />
                <SendMessegeToPassengers rideId={ride.id} isAdmin={true} />
                </div>
            </div>
        </div>
    )
}

export default RideEditPage;