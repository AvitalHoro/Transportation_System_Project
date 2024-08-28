import React, {useState} from "react";
import RideItem from "./RideItem";
import Filters from "../../layout/Filters";
import RideViewPage from "./RideViewPage";

const MainDriverPage = () => {


    const getMyRides = () => {
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

    const [viewOrGallery, setViewOrGallery] = useState(0);
    const [ride, setRide] = useState({});
    const MyRideList = getMyRides();
    return (
        <div style={{padding:'1.5em'}}>
                
                {viewOrGallery? <RideViewPage ride={ride} setViewOrGallery={setViewOrGallery}/> : 
        <div style={{padding:'1.5em'}}>
  <div className="register-page-title">
                <span>לחץ על נסיעה כדי לראות פרטים נוספים</span>
            </div>
            <Filters _color={"#1F628E"} />
            <div className="ride-gallery-content">
                {
                    MyRideList.map((ride) =>
                        <RideItem
                    setViewOrGallery={setViewOrGallery}
                    setRide={setRide}
                           ride={ride}
                        />
                    )
                }
            </div>        </div>}
            </div>
    )
}

export default MainDriverPage;