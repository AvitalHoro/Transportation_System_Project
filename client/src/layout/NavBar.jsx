import React, { useState } from "react";
import '../style/Layout.css';
import { Link } from "react-router-dom";
import { useMediaQuery } from '@mui/material';

const NavBar = ({navigateNum, setNavigateNum}) => {

    const [isHovered, setIsHovered] = useState(false);
    const isComputerScreen = useMediaQuery('(min-width:600px)');



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
            link: "/info",
            img: "rides-info.png",
            press_img: "rides-info-press.png",
        },
        {
            name: "צור קשר",
            link: "/contact",
            img: "contact-us.png",
            press_img: "contact-us-press.png",
        }
    ]

    if (!isComputerScreen) {
        options.push({
            name: "הודעות",
            link: "/messages",
            img: "messages.png",
            press_img: "messages-press.png",
    }
    )
    }
        
        
    return (
        <>
            <nav dir="rtl" className={isComputerScreen? "sidebar": "bottombar"}>
                <ul style={{margin: '0', padding: '0'}}>
                    {options.map((option, index) => {
                        return (
                            <li key={index} className="option"
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(-1)}>
                                <Link to={`/home/user${option.link}`} onClick={()=>setNavigateNum(index)}>
                                    <div className="option-img-container" style={{backgroundColor: isHovered===index  || navigateNum===index? 'white': 'transparent' }}>
                                    <img
                                        src={`../../icons/${isHovered===index || navigateNum===index ? option.img : option.press_img}`}
                                        alt={option.name} 

                                        />
                                    </div>
                                    <span className="option-title">{option.name}</span>
                                </Link>

                            </li>
                        )
                    })}
                </ul>
            </nav>

        </>
    )
}

export default NavBar;
