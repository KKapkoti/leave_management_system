//config/db.js


const mongoose = require('mongoose');

// module.exports.connectDB= async() => {
//     try{
//         const {connection}=await mongoose.connect(process.env.MONGO_URL);
//          console.log(`Mongo is connected with ${connection.host}`);
//     }catch(error){
//          console.log(error);
//          console.log("Mongo connection failed");
//     }
// };

// const URL = "mongodb://127.0.0.1:27017/Leave_Management_System"


const URL = process.env.MONGO_URL;

const connectDB = async() => {
    try{
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully");
    } catch (error){
        console.error("MongoDB connection failed:" + error);
        process.exit(1);// Exit with failure
    }
}

module.exports = connectDB;


