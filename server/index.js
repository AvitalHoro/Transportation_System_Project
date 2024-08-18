const express = require('express');
const cors = require('cors');
//const db = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 
const transportationRoutes = require('./routes/transportationRoutes');
const stationRoutes = require('./routes/stationRoutes'); 
const authenticateJWT = require('./middleware/authenticateJWT'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/transportations', authenticateJWT, transportationRoutes); 
app.use('/api/stations', authenticateJWT, stationRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



