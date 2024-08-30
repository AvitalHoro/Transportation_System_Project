import React from "react";
import "../../style/popUp.css";

const ProfilePopUp = ({ user }) => {
    
        return (
            <div className="profile-pop-up">
                <div className="profile-pop-up-info">
                    <div className="profile-pop-up-info-row">
                        <span style={{fontSize: '1.2em'}}>{user.name}</span>
                    </div>
                    <div className="profile-pop-up-info-row">
                        <span>טלפון: </span>
                        <span>{user.phone}</span>
                    </div>
                    <div className="profile-pop-up-info-row">
                        <span>אימייל: </span>
                        <span>{user.email}</span>
                    </div>
                </div>
                <button className="log-out-button">התנתק מהחשבון</button>
            </div>
        )
    }

export default ProfilePopUp