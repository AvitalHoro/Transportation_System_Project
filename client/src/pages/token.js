import { logout } from '../requests';

// Checking if the token is expired
const checkInactivity = async () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
        const lastActivityDate = new Date(lastActivity);
        const now = new Date();
        const timeDifference = now - lastActivityDate;
        const inactivityThreshold = 3 * 60 * 60 * 1000; // 3 hours

        if (timeDifference > inactivityThreshold) {
            await logout(); // Call the logout function
        } else {
            localStorage.setItem('lastActivity', now.toISOString());
        }
    }
};

setInterval(checkInactivity, 60000); // Check every minute

const updateLastActivity = () => {
    localStorage.setItem('lastActivity', new Date().toISOString());
};

document.addEventListener('keypress', updateLastActivity);
document.addEventListener('mousemove', updateLastActivity);
document.addEventListener('click', updateLastActivity);
