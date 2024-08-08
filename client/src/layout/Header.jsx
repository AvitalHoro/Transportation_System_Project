import React from "react";

const Header = ( { name } ) => {
    
        return (
            <>
                <header>
                    <img className="logo" src="logo.png" alt="logo" />
                    <span className="hello_user">{name} שלום</span>
                    <button className="profile_button" ></button>
                </header>
            </>
        )
}

export default Header;