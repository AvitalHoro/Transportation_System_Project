import React, {useState} from "react";
import MyRideItem from "./MyRideItem";
import MymessagePage from "./MyMessagePage";
import { useMediaQuery } from '@mui/material';
import MessegesPopUp from "../MessegesPopUp";

const MyRidePage = ({user, myRides}) => {


    const isComputerScreen = useMediaQuery('(min-width:730px)');
    const [messegesIsClicked, setMessegesIsClicked] = useState(false);



    return (
        <div className="my-ride-page">
            {messegesIsClicked? <MessegesPopUp setMessegesIsClicked={setMessegesIsClicked} userId={user.UserID} />: null}
            <div className="my-ride-container" style={{width: isComputerScreen? '60%': '100%'}}>
                <div className="my-ride-title">
                <span>הנסיעות שלי</span>
                </div>
                <div className="my-ride-gallery">
                    {myRides.map(ride => <MyRideItem 
                    userId={user.UserID}
                        registerId={ride.rideId}
                        exitCity={ride.fromCity}
                        targetCity={ride.toCity}
                        date={ride.Date}
                        time={ride.Time}
                        status={ride.RegistrationsStatus}
                        toStation={ride.toStation}
                        fromStation={ride.fromStation}
                        stationsList={ride.RideStations}
                        setMessegesIsClicked={setMessegesIsClicked}/>)}
                </div>

            </div>
            
            {isComputerScreen && (
                <div className="my-message-container">
            <MymessagePage rideIds={myRides.map(ride => ride.rideId)} />
            </div>
        )}

        </div>
    )
}

export default MyRidePage;