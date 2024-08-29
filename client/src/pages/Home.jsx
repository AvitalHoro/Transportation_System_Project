import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import MainUserPage from './UserPages/MainUserPage';
import MainAdminPage from './AdminPages/MainAdminPage';
import MainDriverPage from './DriverPages/MainDriverPage';


const Home = ({ user }) => {

    return (
        <>
        <Routes>
            <Route path="/" element={<NavigateHandler userType={user.type} />} />
          <Route path="user/*" element={<MainUserPage user={user}/>} />
          <Route path="admin/*" element={<MainAdminPage />} />
          <Route path="driver/*" element={<MainDriverPage user={user}/>} />
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