import React from "react";

const NavBar = () => {

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
            <nav className="nav-bar">
                <ul>
                    {options.map((option, index) => {
                        return (
                            <li key={index}>
                                <a href={option.link}>
                                    <img src={option.img} alt={option.name} />
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