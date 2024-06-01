//app.js
const express = require('express');
const app = express();//Express App
const mongoose = require('mongoose');
const cors = require('cors');
// Load environment variables
const { config } = require("dotenv");
config({path: "./config/.env"});

// const corsOptions = {
//     origin: "http://localhost:3000",
//     methods: "GET, POST, PUT, DELETE, OPTIONS",
//     credentials: true
// };

// //let's handle cors
// app.use(cors(corsOptions));


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow cookies, authorization headers, etc. to be sent
  }));

//database
const connectDB = require("./config/db.js");
connectDB();

//Import routes
const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const hodRoutes = require('./routes/hodRoutes');
const adminRoutes = require('./routes/adminRoutes'); 



//Middewares
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/admin', adminRoutes);


//Error middleawre
const errorMiddleware = require('./middlewares/error-middleware');
app.use(errorMiddleware);











// const bcrypt = require('bcrypt');

// // Assuming 'password' is the plaintext password provided by the admin
// const plaintextPassword = 'adminPass#AKIT';

// // Define an async function to generate the hashed password
// const generateHashedPassword = async () => {
//     try {
//         // Generate a salt
//         const saltRounds = 10; // This determines the complexity of the hashing
//         const salt = await bcrypt.genSalt(saltRounds);

//         // Hash the password using the generated salt
//         const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

//         // Now 'hashedPassword' contains the securely hashed password that you can store in the database
//         return hashedPassword;
//     } catch (error) {
//         console.error('Error generating hashed password:', error);
//         // Handle the error appropriately
//         throw error;
//     }
// };

// // Call the async function to generate the hashed password
// generateHashedPassword()
//     .then((hashedPassword) => {
//         console.log('Hashed Password:', hashedPassword);
//         // Store the hashed password in the database
//     })
//     .catch((error) => {
//         console.error('Error generating hashed password:', error);
//         // Handle the error appropriately
//     });



















//Root route
app.get('/', (req, res) => {
    res.status(200).send('Welcome, your app is working well');
    console.log('Welcome, your app is working well');
});


module.exports = app; 


