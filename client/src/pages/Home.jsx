import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import MainUserPage from './UserPages/MainUserPage';
import MainAdminPage from './AdminPages/MainAdminPage';
import MainDriverPage from './DriverPages/MainDriverPage';


const Home = ({ userType }) => {

    return (
        <>
        <Routes>
            <Route path="/" element={<NavigateHandler userType={userType} />} />
          <Route path="user/*" element={<MainUserPage />} />
          <Route path="admin/*" element={<MainAdminPage />} />
          <Route path="driver/*" element={<MainDriverPage />} />
        </Routes>
        </>
    )
}

const NavigateHandler = ({userType}) => {
  
      switch (userType) {
        case 'admin':
          return <Navigate to="/home/admin" />;
        case 'user':
          return <Navigate to="/home/user" />;
        case 'driver':
          return <Navigate to="/home/driver" />;
      }
  };

export default Home;