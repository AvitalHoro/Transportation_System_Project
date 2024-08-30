import React from "react";
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import "../../style/AdminPage.css";

const AdminMainOption = ({setNavigate}) => {

    const mainOption = ["להוסיף נסיעה", "להוסיף נהג", "לערוך נסיעות קיימות", "לשלוח הודעה לכולם"]

    return (
        <div className="admin-main-op">
            <div className="admin-op-title">
                <span>מה תרצה לעשות היום?</span>
            </div>
            <div className="admin-main-option-container">
                <div className="option-a-m-co"  onClick={()=> setNavigate(1)}>
                    <div className="icon-container">
                    <AddIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                    </div>
                    <span>{mainOption[0]}</span>
                </div>
                <div className="option-a-m-co" onClick={()=> setNavigate(2)}>
                    <div className="icon-container">
                    <PersonAddIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                    </div>
                    <span>{mainOption[1]}</span>
                </div>
                <div className="option-a-m-co"  onClick={()=> setNavigate(3)}>
                    <div className="icon-container">
                    <DirectionsBusIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                    </div>
                    <span>{mainOption[2]}</span>
                </div>
                <div className="option-a-m-co"  onClick={()=> setNavigate(4)}>
                    <div className="icon-container">
                    <EmailIcon sx={{
                        color: "white",
                        fontSize: "180%",
                    }} />
                    </div>
                    <span>{mainOption[3]}</span>
                </div>
            </div>


        </div>
    )
}

export default AdminMainOption;