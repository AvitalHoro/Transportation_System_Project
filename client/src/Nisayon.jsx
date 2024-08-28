import React from "react";

import { getRequest } from "./requests";

const Nisayon = () => {

    const data = getRequest('/messages/generals');

    console.log("data from nisayon: ",data);

    return (
        <div>
            {data.map(n=> <div>{n.content}</div>)}
        </div>
    )
}

export default Nisayon;