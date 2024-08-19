const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cropRoutes = require('./routes/cropRoutes');
const marketRoutes = require('./routes/marketRoutes');
const priceRoutes = require('./routes/priceRoutes');
const userRoutes = require('./routes/userRoutes'); 
const path = require('path');

const app = express();

// Test the connection
db.connect()
  .then(obj => {
    obj.done(); // success, release the connection;
    console.log("PostgreSQL connection successful");
  })
  .catch(error => {
    console.log("Error connecting to PostgreSQL:", error);
  });

  // Enable CORS for all origins or specify your Flutter app's origin
app.use(cors({
  origin: 'http://localhost:49636' // Update this to the origin of your Flutter app
}));

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/api', routes);
app.use('/api/crops', cropRoutes);
app.use('/api/users', userRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/prices', priceRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
