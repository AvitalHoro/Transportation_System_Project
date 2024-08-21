import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/UserPages/Home';
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import NotFound from './pages/NotFound';
import RideRegister from './pages/UserPages/RideRegister';


function App() {

  return (
    // <Home></Home>
    <Router>

      <Header></Header>

      <NavBar></NavBar>
            <div className="app-container" dir='rtl'>

      {/* <Sidebar handleInfo={handleInfo}/> */}
      <div className="main-content">
        <RideRegister></RideRegister>

      <Routes>
        <Route path="/" element={<NavigateHandler />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/completion_of_details" element={<CompletionOfDetails setUser={setUser}/>} /> */}
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      </div>
    </Router>
  );
};

const NavigateHandler = () => {
  const user = localStorage.getItem('user');

  if (user) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/login" />;
  }
};

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default App
