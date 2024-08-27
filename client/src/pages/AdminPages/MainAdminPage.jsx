import React from "react";
import AdminMainOption from "./AdminMainOption";
import RideGalleryPage from "./RideGalleryPage";
import InfoRideComponent from "./RideEditPageComponent/InfoRideComponent";
import RideEditPage from "./RideEditPage";
import AttachFileButton from "./AttachFileButton";

const MainAdminPage = () => {

    const ride = {
        id: 125,
        exit: "תל אביב",
        target: "ירושלים",
        date: "2021-06-01",
        time: "08:00",
        seats: 30,
        price: 30,
        driver: "דוד כהן",
        registerNum: "12",
    }

    return (
        <div style={{height: "100%"}}>
            {/* <AdminMainOption /> */}
            {/* <RideGalleryPage /> */}
            <RideEditPage ride={ride}/>
            <AttachFileButton />
     </div>
    )
}

export default MainAdminPage;