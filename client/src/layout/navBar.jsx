import React, { useState } from "react";
import '../style/Layout.css';

const NavBar = () => {

    const [sizeScreen, setSizeScreen] = useState(window.innerWidth > 768 ? 2 : 1);
    const [isHovered, setIsHovered] = useState(false);



    const options = [
        {
            name: "הנסיעות שלי",
            link: "/my-rides",
            img: "my-rides.png",
            press_img: "my-rides-press.png",
        },
        {
            name: "רישום לנסיעה",
            link: "/register-to-ride",
            img: "register-to-ride.png",
            press_img: "register-to-ride-press.png",
        },
        {
            name: "מידע על נסיעות",
            link: "/rides-info",
            img: "rides-info.png",
            press_img: "rides-info-press.png",
        },
        {
            name: "צור קשר",
            link: "/contact-us",
            img: "contact-us.png",
            press_img: "contact-us-press.png",
        }
    ]
        
        
    return (
        <>
            <nav dir="rtl" className={sizeScreen>1? "sidebar": "bottombar"}>
                <ul style={{margin: '0', padding: '0'}}>
                    {options.map((option, index) => {
                        return (
                            <li key={index} className="option"
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(-1)}>
                                <a href={option.link}>
                                    <div className="option-img-container" style={{backgroundColor: isHovered===index? 'white': 'transparent' }}>
                                    <img
                                        src={`./icons/${isHovered===index ? option.img : option.press_img}`}
                                        alt={option.name} 

                                        />
                                    </div>
                                    <span className="option-title">{option.name}</span>
                                </a>

                            </li>
                        )
                    })}
                </ul>
            </nav>

        </>
    )
}

export default NavBar;