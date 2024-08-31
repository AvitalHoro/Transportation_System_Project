import React from "react";
import '../style/Layout.css';

const Header = ( { userType, name, setOpenProfilePopUp } ) => {
    
        return (
            <>
                <header dir="rtl">
                    <img className="logo" src={userType=='user'? "../../userLogo.png" : userType=='admin'? "../../adminLogo.png": "../../driverLogo.png"} alt="בדרך שלך" />
                    <div className="spacer"></div>
                    <span className="hello_user">{name? `שלום ${name}` : ""}</span>
                    {userType=='user' &&
                    <img  className="profile_button"  src="../../profile.png" alt="פרופיל" onClick={()=>setOpenProfilePopUp(prevOpenProfilePopUp => !prevOpenProfilePopUp)}/>}
                </header>
            </>
        )
}

export default Header;