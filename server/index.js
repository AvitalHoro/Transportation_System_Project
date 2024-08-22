const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const transportationRoutes = require('./routes/transportationRoutes');
const stationRoutes = require('./routes/stationRoutes'); 
const authenticateJWT = require('./middleware/authenticateJWT'); 
const messagesRoutes = require('./routes/messageRoutes');
const registrationsRoutes = require('./routes/registrationRouter');
const dbConnection = require('./middleware/dbConnection');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(dbConnection); 

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/transportations',authenticateJWT, transportationRoutes); 
app.use('/api/stations', authenticateJWT, stationRoutes); 
app.use('/api/messages', messagesRoutes);
app.use('/api/registrations', authenticateJWT, registrationsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



