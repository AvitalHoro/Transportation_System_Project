import React from "react";
import Filters from "../../layout/Filters";
import RideRegister from "./RideRegister";

const RegisterPage = () => {

    const getAllNextRides = () => {
        return [
            {
                id: 1234,
                exit: "תל אביב",
                target: "ירושלים",
                date: "2021-06-01",
                time: "08:00",
            },
            {
                id: 456,
                exit: "חיפה",
                target: "קצרין",
                date: "2024-06-01",
                time: "16:30",
            },
            {
                id: 789,
                exit: "תל אביב",
                target: "חיפה",
                date: "2021-06-01",
                time: "08:00",
            },

        ];
    }

    const allRideList = getAllNextRides();

    return (
        <div className="page-container register-page">
            <div className="register-page-title">
                <span>בחר את הנסיעה אליה אתה רוצה להירשם</span>
            </div>
            <Filters />
            <div className="register-page-content">
                {
                    allRideList.map((ride) =>
                        <RideRegister
                            rideId={ride.id}
                            exit={ride.exit}
                            target={ride.target}
                            date={ride.date}
                            time={ride.time} 
                        />
                    )
                }
            </div>
        </div>
    )
}

export default RegisterPage;