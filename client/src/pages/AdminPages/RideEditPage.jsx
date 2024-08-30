import React from "react";
import InfoRideComponent from "./RideEditPageComponent/InfoRideComponent";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReplaceDriver from "./RideEditPageComponent/ReplaceDriver";
import Passengers from "./RideEditPageComponent/Passengers";
import Stops from "./RideEditPageComponent/Stops";
import SendMessegeToPassengers from "./RideEditPageComponent/SendMessegeToPassengers";
import AddStationPopUp from "./RideEditPageComponent/AddStationPopUp";

const RideEditPage = ({ ride, setEditOrGallery }) => {

    const getStationsList = () => {
        //wait for server
        //return all stations table 
        return [
            {
                name: "תחנה מרכזית ירושלים",
                id: 1,
            },
            {
                name: "תחנה מרכזית תל אביב",
                id: 2,
            },
            {
                name: "מחלף חמד",
                id: 3,
            }
        ]
    }

    const handleAddStation = (stationId, rideId, type) => {
        //wait for server
    }

    const stationsListWithId = getStationsList();
    const stationsList = stationsListWithId.map(sat => sat.name);

    const [dynamicStopsList, setDynamicStopsList] = React.useState(stops);

    const [openStationsPopUp, setOpenStationsPopUp] = React.useState(false);

    //setOpenPopUpStation, stationsList, setStopsList, isEditPage, handleAddStation
    return (
        <div className="page-container ride-edit-page">
            {openStationsPopUp? 
            <AddStationPopUp 
            rideId={ride.id} 
            setOpenPopUpStation={setOpenStationsPopUp} 
            stationsList={stationsList}
            setStopsList={setDynamicStopsList}
            isEditPage={true}
            handleAddStation={handleAddStation}
            /> 
            : null}
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
                <ReplaceDriver driverName={ride.driverName} rideId={ride.id} />
                </div>
                <div className="bottom-ride-edit-main">
                <Passengers registers={ride.Registers} />
                <Stops 
                stops={ride.RideStations} 
                isAdmin={true} 
                setOpenStationsPopUp={setOpenStationsPopUp} 
                dynamicStopsList={dynamicStopsList} 
                setDynamicStopsList={setDynamicStopsList}
                />
                <SendMessegeToPassengers rideId={ride.id} isAdmin={true} />
                </div>
            </div>
        </div>
    )
}

export default RideEditPage;