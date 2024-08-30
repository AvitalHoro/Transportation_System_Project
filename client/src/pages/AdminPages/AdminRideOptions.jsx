import React, { useState } from "react";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ClearIcon from '@mui/icons-material/Clear';
import SyncIcon from '@mui/icons-material/Sync';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReplayIcon from '@mui/icons-material/Replay';
import MessegesPopUp from "../MessegesPopUp";

const AdminOptions = ({ setEditOrGallery, setRide, ride, rideStatus, setRideStatus, userId }) => {

    const handleCancelRide = () => {
        //wait for server 

        //send registerId
        console.log("Cancel register ", ride.id);
        setRideStatus("cancel");
    }

    const handleReturnedRide = () => {
        //wait for server 

        //send registerId
        console.log("Returned register ", ride.id);
        setRideStatus("active");
    }

    const [messegesIsClicked, setMessegesIsClicked] = useState(false);

    return (
        <div>
            {messegesIsClicked ? <MessegesPopUp setMessegesIsClicked={setMessegesIsClicked} userId={user.id} rideId={ride.id} /> : null}
            <div className="row-option-ride">
                <div className="option-ride-item">
                    <div className="option-container"
                    onClick={()=>setMessegesIsClicked(true)}>
                        <ChatBubbleIcon sx={{
                            color: "white",
                            fontSize: "180%",
                        }} />
                    </div>
                    <span className="option-ride-title" style={{ color: "#FFD700" }}>הודעות</span>
                </div>
                {rideStatus === "active" ? (
                    <div className="option-ride-item">
                        <div
                            className="option-container"
                            style={{ backgroundColor: "#ED1D2B" }}
                            onClick={handleCancelRide}
                        >
                            <ClearIcon
                                sx={{
                                    color: "white",
                                    fontSize: "180%",
                                    fontWeight: "bold",
                                }}
                            />
                        </div>
                        <span className="option-ride-title" style={{ color: "#ED1D2B" }}>
                            בטל נסיעה
                        </span>
                    </div>
                ) : (
                    <div className="option-ride-item">
                        <div
                            className="option-container"
                            style={{ backgroundColor: "#50BB82" }}
                            onClick={handleReturnedRide}
                        >
                            <ReplayIcon
                                sx={{
                                    color: "white",
                                    fontSize: "180%",
                                    fontWeight: "bold",
                                }}
                            />
                        </div>
                        <span className="option-ride-title" style={{ color: "#50BB82" }}>
                            שחזר נסיעה
                        </span>
                    </div>
                )}
            </div>

            <div className="row-option-ride">
                <div className="option-ride-item">
                    <div className="option-container" style={{ backgroundColor: "#CB6CE6" }}>
                        <SyncIcon sx={{
                            color: "white",
                            fontSize: "180%",
                        }} />
                    </div>
                    <span className="option-ride-title" style={{ color: "#CB6CE6" }}>החלף נהג</span>
                </div>

                <div className="option-ride-item"
                    onClick={() => { setEditOrGallery(1); setRide(ride); console.log(ride); }}>
                    <div className="option-container" style={{ backgroundColor: "#77B6F1" }}>
                        <EditNoteIcon sx={{
                            color: "white",
                            fontSize: "180%",
                        }} />
                    </div>
                    <span className="option-ride-title"
                        style={{ color: "#77B6F1" }}
                    >ערוך פרטי נסיעה</span>
                </div>

            </div>
        </div>
    )
}

export default AdminOptions;