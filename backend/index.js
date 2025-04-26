// index.js
import express from 'express';
import {connectDB} from './config/db.js'; // Adjust the path as necessary
import dotenv from 'dotenv';
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
