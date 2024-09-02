import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoRideComponent from "../AdminPages/RideEditPageComponent/InfoRideComponent";
import Passengers from "../AdminPages/RideEditPageComponent/Passengers";
import Stops from "../AdminPages/RideEditPageComponent/Stops";
import SendMessegeToPassengers from "../AdminPages/RideEditPageComponent/SendMessegeToPassengers";
import '../../style/AdminRideEdit.css'
import { register } from "../../requests";

const RideViewPage = ({ ride, setViewOrGallery }) => {
        return (
            <div className="page-container ride-edit-page">
                <div className="top-ride-edit-container">
                    <div className="ride-edit-title">
                        <span>אלה פרטי הנסיעה המבוקשת:</span>
                    </div>
                    <div className="back-to-rides-list-button"
                    onClick={()=> setViewOrGallery(0)}>
                        <span>חזור לרשימת הנסיעות</span>
                        <div className="circle-icon" style={{backgroundColor: "#1F628E"}}> 
                            <ArrowBackIosIcon sx={{
                                marginLeft: "7.5px",
                                marginTop: "4.5px",
                                color: 'white',
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="ride-edit-main">
                    <div className="top-ride-edit-main" style={{maxWidth: '420px'}}>
                    <InfoRideComponent ride={ride} _color={"#1F628E"}/>
                    </div>
                    <div className="bottom-ride-edit-main">
                    <Passengers registers={ride.Registers} />
                    <Stops rideId={ride.id} stops={ride.RideStations} isAdmin={false}/>
                    <SendMessegeToPassengers rideId={ride.id} isAdmin={false} />
                    </div>
                </div>
            </div>
        )
    }
    
    export default RideViewPage;