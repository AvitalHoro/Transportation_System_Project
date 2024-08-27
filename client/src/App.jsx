import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './layout/Header';
import NotFound from './pages/NotFound';


function App() {

  const user = {
    name: "אביטל",
    type: "admin"
  }

  return (
    <Router>

      <Header userType={user.type} name={user.name}></Header>

      <div className="app-container" dir='rtl'>


        <Routes>
          <Route path="/" element={<NavigateHandler />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/*" element={<Home userType={user.type} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

const NavigateHandler = () => {
  const user = "hj"//localStorage.getItem('user');

  if (user) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App
