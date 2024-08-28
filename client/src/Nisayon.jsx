import React from "react";



const Nisayon = () => {

    fetch('http://localhost:5000/api/messages/generals', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer TOKEN'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));


    return (
        <div>
            <h1>ניסיון</h1>
        </div>
    )
}

export default Nisayon;