import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './layout/Header';
import NotFound from './pages/NotFound';


function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  console.log(user);  
  

  useEffect(() => {
    // setUser({
    //   id: 1,
    //   name: "אבי רבינוביץ'",
    //   type: "Driver"
    // })
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);


  const [openProfilePopUp, setOpenProfilePopUp] = useState(false);

  return (
    <Router>

      {user? <Header userType={user.UserPermission} name={user.Username} setOpenProfilePopUp={setOpenProfilePopUp}></Header> : <Header name={user? user.Username: null}></Header>}
      <div className="app-container" dir='rtl'>
        <Routes>
          <Route path="/" element={<NavigateHandler user={user} />} />
          <Route path="/login" element={<Login  setUser={setUser}/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home/*" element={<PrivateRoute><Home user={user} openProfilePopUp={openProfilePopUp}/></PrivateRoute>} />
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

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('user') ? children : <Navigate to="/login" />;
};

export default App
