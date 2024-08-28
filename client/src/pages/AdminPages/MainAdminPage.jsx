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

const MainAdminPage = () => {

    const [navigate, setNavigate] = useState(0);
    const [editOrGallery, setEditOrGallery] = useState(0);
    const [ride, setRide] = useState({});

    // setRide({
    //     id: 125,
    //     exit: "תל אביב",
    //     target: "ירושלים",
    //     date: "2021-06-01",
    //     time: "08:00",
    //     seats: 30,
    //     price: 30,
    //     driver: "דוד כהן",
    //     registerNum: "12",
    // });


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
                
                {editOrGallery? <RideEditPage ride={ride} setEditOrGallery={setEditOrGallery}/>: <><MenuButton setNavigate={setNavigate}/><RideGalleryPage setRide={setRide} setEditOrGallery={setEditOrGallery}/></>}
                </div>;
        case 4:
            return <div>
                <MenuButton setNavigate={setNavigate}/>
                <SendMessageForAll/>
            </div>
    }
}
// <AdminMainOption setNavigate={setNavigate}/>
{/* <RideGalleryPage /> */ }
{/* <RideEditPage ride={ride}/> */ }
    


export default MainAdminPage;