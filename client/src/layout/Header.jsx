import React from "react";
import '../style/Layout.css';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { logout } from "../requests";

const Header = ( { userType, name, setOpenProfilePopUp } ) => {

    const handleLogout =  async () => {
        {     
          console.log('logout');
          const result = await logout();
    
          if (result) {
            console.log('Logout in successfully:', result);
            window.location.replace('/login');
          } else {
            console.error('Logout failed');
            alert('לא הצלחנו להתנתק מהחשבון. נסה שנית או פנה לתמיכה');
          }
        }
      }
    
        return (
            <>
                <header dir="rtl">
                    <img className="logo" src={userType=='user'? "../../userLogo.png" : userType=='admin'? "../../adminLogo.png": "../../driverLogo.png"} alt="בדרך שלך" />
                    <div className="spacer"></div>
                    <span className="hello_user">{name? `שלום ${name}` : ""}</span>
                    {userType=='user' &&
                    <img  className="profile_button"  src="../../profile.png" alt="פרופיל" onClick={()=>setOpenProfilePopUp(prevOpenProfilePopUp => !prevOpenProfilePopUp)}/>}
                    {
                        (userType==='admin' || userType==='driver' ) && <PowerSettingsNewIcon className="logout" onClick={handleLogout}/>
                    }
                </header>
            </>
        )
}

export default Header;