import React from "react";

const NavBar = () => {

    const options = [
        {
            name: "הנסיעות שלי",
            link: "/my-trips",
            img: "my-trips.png",
            press_img: "my-trips-press.png",
        },
        {
            name: "רישום לנסיעה",
            link: "/register-to-trip",
            img: "register-to-trip.png",
            press_img: "register-to-trip-press.png",
        },
        {
            name: "מידע על נסיעות",
            link: "/trips-info",
            img: "trips-info.png",
            press_img: "trips-info-press.png",
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