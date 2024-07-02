import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userAuth from './routes/userAuth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(`Error in connection: ${err}`);
    });


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Root route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Use user authentication routes
app.use('/api/auth/', userAuth);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
