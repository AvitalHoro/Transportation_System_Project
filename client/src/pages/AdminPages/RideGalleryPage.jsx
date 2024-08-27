import React from "react";
import Filters from "../../layout/Filters";
import RideItem from "./RideItem";

const RideGalleryPage = () => {


    const getAllRides = () => {
        return [
            {
                exit: "תל אביב",
                target: "ירושלים",
                date: "2021-06-01",
                time: "08:00",
                seats: 30,
                price: 30,
                driver: "דוד כהן",
                registerNum: "12",
            },
            {
                exit: "חיפה",
                target: "קצרין",
                date: "2024-06-01",
                time: "16:30",
                seats: 30,
                price: 30,
                driver: "דוד כהן",
                registerNum: "124",
            },
            {
                exit: "תל אביב",
                target: "חיפה",
                date: "2021-06-01",
                time: "08:00",
                seats: 30,
                price: 30,
                driver: "דוד כהן",
                registerNum: "8",
            },
        ];
    }

    const allRideList = getAllRides();

    return (
<div className="page-container register-page">
            <div className="register-page-title">
                <span>בחר את הנסיעה אותה ברצונך לערוך</span>
            </div>
            <Filters />
            <div className="ride-gallery-content">
                {
                    allRideList.map((ride) =>
                        <RideItem
                           ride={ride}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default RideGalleryPage;