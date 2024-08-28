import React from "react";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ClearIcon from '@mui/icons-material/Clear';
import SyncIcon from '@mui/icons-material/Sync';
import EditNoteIcon from '@mui/icons-material/EditNote';

const AdminOptions = ({setEditOrGallery, setRide, ride}) => {
    return (
        <div>
            <div className="row-option-ride">
            <div className="option-ride-item">
                <div className="option-container">
                    <ChatBubbleIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                </div>
                <span className="option-ride-title" style={{ color: "#FFD700" }}>הודעות</span>
            </div>

            <div className="option-ride-item">
                <div className="option-container" style={{ backgroundColor: "#ED1D2B" }}>
                    <ClearIcon sx={{
                        color: "white",
                        fontSize: "180%",
                        fontWeight: "bold"
                    }} />
                </div>
                <span className="option-ride-title" style={{ color: "#ED1D2B" }}>בטל נסיעה</span>
            </div>
            </div>

            <div className="row-option-ride">
            <div className="option-ride-item">
                <div className="option-container"  style={{ backgroundColor: "#CB6CE6" }}>
                    <SyncIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                </div>
                <span className="option-ride-title" style={{ color: "#CB6CE6" }}>החלף נהג</span>
            </div>

            <div className="option-ride-item"
            onClick={()=> {setEditOrGallery(1); setRide(ride); console.log(ride);}}>
                <div className="option-container"  style={{ backgroundColor: "#77B6F1" }}>
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