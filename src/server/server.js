const express = require('express');
const connectDB = require('./db');
const bookRoutes = require('./routes/bookRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api', bookRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../public')));

// Catch-all for client-side routing - only for non-API requests
app.get('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api')) {  // Ensure only non-API requests serve index.html
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
