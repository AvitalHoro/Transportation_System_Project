import React, { useState } from "react";
import AdminMainOption from "./AdminMainOption";
import RideGalleryPage from "./RideGalleryPage";
import InfoRideComponent from "./RideEditPageComponent/InfoRideComponent";
import RideEditPage from "./RideEditPage";
import AttachFileButton from "./AttachFileButton";
import MenuIcon from '@mui/icons-material/Menu';
import "../../style/AdminPage.css";
import AddRide from "./AddRide";
import AddDriver from "./AddDriver";
import SendMessageForAll from "./SendMessageForAll";

const MenuButton = ({setNavigate}) => {
    return (
        <div className="menu-button" onClick={()=> setNavigate(0)}>
            <MenuIcon sx={{
                color: "white",
                fontSize: "200%",
            }} />
        </div>
    )
}

const MainAdminPage = ( {userId} ) => {

    const [navigate, setNavigate] = useState(0);
    const [editOrGallery, setEditOrGallery] = useState(0);
    const [ride, setRide] = useState({});

    const [driverUpdate, setDriverUpdate] = useState(false);


    switch (navigate) {
        case 0:
            return <AdminMainOption setNavigate={setNavigate} />;
        case 1:
            return <div>
                <MenuButton setNavigate={setNavigate}/>
                <AddRide/>
            </div>
        case 2:
            return <div>
                <MenuButton setNavigate={setNavigate}/>
                <AddDriver/>
            </div>
        case 3:
            return <div>
                
                {editOrGallery? <RideEditPage setDriverUpdate={setDriverUpdate} ride={ride} setEditOrGallery={setEditOrGallery}/>: 
                <><MenuButton setNavigate={setNavigate}/>
                <RideGalleryPage setDriverUpdate={setDriverUpdate} driverUpdate={driverUpdate} ride={ride} setRide={setRide} setEditOrGallery={setEditOrGallery} userId={userId}/></>}
                </div>;
        case 4:
            return <div>
                <MenuButton setNavigate={setNavigate}/>
                <SendMessageForAll/>
            </div>
    }
}

    


export default MainAdminPage;