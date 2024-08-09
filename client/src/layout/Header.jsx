import React from "react";
import '../style/Layout.css';

const Header = ( { name } ) => {
    
        return (
            <>
                <header dir="rtl">
                    <img className="logo" src="logo.png" alt="logo" />
                    <div className="spacer"></div>
                    <span className="hello_user">שלום {name? name: "נוסע"}</span>
                    <img  className="profile_button"  src="./profile.png" alt="פרופיל" />
                </header>
            </>
        )
}

export default Header;