import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './layout/Header';
import NotFound from './pages/NotFound';


function App() {

  let user = localStorage.getItem('user') || null;
  console.log(user);  
  
  user = {
    name: "אביטל",
    type: "user"
  }

  const [openProfilePopUp, setOpenProfilePopUp] = useState(false);

  return (
    <Router>

      {user? <Header userType={user.type} name={user.name} setOpenProfilePopUp={setOpenProfilePopUp}></Header> : <Header name={user.name}></Header>}
      <div className="app-container" dir='rtl'>
        <Routes>
          <Route path="/" element={<NavigateHandler user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/*" element={<Home user={user} openProfilePopUp={openProfilePopUp}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

const NavigateHandler = ({user}) => {

  if (user) {
    console.log("user");
    return <Navigate to="/home" />;
  } else {
    console.log("no user");
    return <Navigate to="/login" />;
  }
};

export default App
