import React from "react";
import "../../style/popUp.css";
import { logout } from "../../requests";

const ProfilePopUp = ({ user }) => {
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
            <div className="profile-pop-up">
                <div className="profile-pop-up-info">
                    <div className="profile-pop-up-info-row">
                        <span style={{fontSize: '1.2em'}}>{user.Username}</span>
                    </div>
                    <div className="profile-pop-up-info-row">
                        <span>טלפון: </span>
                        <span>{user.UserPhone}</span>
                    </div>
                    <div className="profile-pop-up-info-row">
                        <span>אימייל: </span>
                        <span>{user.UserEmail}</span>
                    </div>
                </div>
                <button className="log-out-button" onClick={handleLogout}>התנתק מהחשבון</button>
            </div>
        )
    }

export default ProfilePopUp