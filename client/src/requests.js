const api = 'http://localhost:5000/api';


//general function for request
export const request = async (method, url, token, body = null) => {
    console.log('request ' + method + ' ' + url + ' ' + token + ' ' + body);
    try {
        const response = await fetch(`${api}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error:', error);
        return { error: error.message };
    }
};


export const login = async (email, password) => {
    try {
        console.log('login')
        const data = await request('POST', '/users/login', '', { email, password });
        console.log(data)

        if (data.token) {
            console.log('Login successful:', data);
            // Save the token and user info locally (e.g., in localStorage)
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('transportations', JSON.stringify(data.transportations));

            return data; // Return the full data, including token, user, and transportations
        } else {
            console.error('Login failed:', data.message);
            return null; // Handle the failed login as needed
        }

    } catch (error) {
        console.error('Error during login:', error);
        return null;
    }
};

export const register = async (username, password, phone, permission, email) => {
    try {
        const data = await request('POST', '/users/register', '', { username, password, phone, permission, email });

        if (data.userId) {
            console.log('User registered successfully:', data);
            return data; // Return the data, which includes the userId
        } else {
            console.error('Registration failed:', data.message);
            return null; // Handle the registration failure as needed
        }

    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

export const logout = async () => {
    try {
        const token = localStorage.getItem('token');

        const result = await request('POST', '/users/logout', token);

        if (result.error) {
            console.error('Logout failed:', result.error);
            return null;
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('transportations');
        console.log('Logout successful and local storage cleared');
        return "logout successful";

    } catch (error) {
        console.error('Error during logout:', error);
        return null;
    }
};

export const addMessegeToPassengers = async (messageContent, sendTime, rideId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${api}/messages/add/${rideId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ messageContent, sendTime }),
        });
        if (response.ok) {
            const data = await response.json();
            return data;           
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during add message:', error);
        return null
    }
}; 



