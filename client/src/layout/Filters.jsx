import React from "react";
import '../style/Layout.css';

const Filters = () => {
    return (
        <>
        <span>מוצא</span>
        <input type="text" placeholder="מוצא" />
        <span>יעד</span>
        <input type="text" placeholder="יעד" />
        <span>תאריך</span>
        <input type="date" />
        </>
    )
}

export default Filters;