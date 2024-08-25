import React, { useState } from "react";
import NavBar from "../../layout/NavBar";
import "../../style/UserPage.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import MyRidePage from "./MyRidePage";
import RegisterPage from "./RegisterPage";


const MainUserPage = () => {

    const [navigateNum, setNavigateNum] = useState(0);

    return (
        <div>
            <NavBar navigateNum={navigateNum} setNavigateNum={setNavigateNum} />
            <div className="user-page-container">
                <Routes>
                    <Route path="/" element={<NavigateHandler navigateNum={navigateNum} />} />
                    <Route path="my-rides" element={<MyRidePage />} />
                    <Route path="register-to-ride" element={<RegisterPage />} />
                    <Route path="info" element={<div />} />
                    <Route path="contact" element={<div/>} />
                </Routes>
            </div>
        </div>
    )
}

const NavigateHandler = ({navigateNum}) => {
    switch(navigateNum) {
        case 0:
            return <Navigate to="/home/user/my-rides" />
        case 1:
            return <Navigate to="/home/user/register-to-ride" />
        case 2:
            return <Navigate to="/home/user/info" />
        case 3:
            return <Navigate to="/home/user/contact" />
    }
}

export default MainUserPage;