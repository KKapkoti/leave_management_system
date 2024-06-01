// controllers/authController.js


const User = require("../models/UserModel");
const { promisify } = require('util');
// const RegistrationService = require("../services/Auth/RegistrationService");
// const loginService = require("../services/Auth/loginService");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../config/jwt");
// const { response } = require("../app");


const registerUser = async(req, res, next) => {
    try{
        const {department, name,  password, phone, gender, email, dateOfBirth,  address, role} = req.body;
    
        if (role !== 'HOD') {
          return res.status(400).json({ message: 'Only HOD can register students' });
      }
        // Check if username already exists
        const existingUser = await User.findOne({ name });
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
    
        // Hash password
        const saltRound = 10;
        const hash_Password = await bcrypt.hash(password, saltRound);
    
        // Create new user
        const newUser = new User({
          department,
          name,
          password: hash_Password,
          // password,
          phone,
          gender,
          email,
          dateOfBirth,
          address,
          role,
        });
    
        await newUser.save();
    
        const token = await generateToken(newUser); 
        res.status(201).json({ message: 'User registered successfully', token });
        console.log("user successfully created", token);

        if (!department || !name || !password || !phone || !gender || !email || !dateOfBirth || !address || !role) {
            throw new Error("Invalid Data", 400);
          }
        
    }catch(error){
        next(error);
          // console.error(error);
          // res.status(500).json({ message: 'Server error' });
      
    }
}



//get user
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field from the response
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};


const loginUser = async(req, res, next) => {
    try{
        const { email, password} = req.body;
        const userExist = await User.findOne({ email});
        // console.log(userExist);
        if(!userExist) {
          return res.status(400).json({message: 'User not found'});
        }
        // const user = await bcrypt.compare(password, userExist.password);
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      // const token = jwt.sign({ userId: User._id }, jwtConfig.secret, { expiresIn: '1h' });
      // res.status(200).json({token});


      const token = await generateToken(userExist);
          res.status(200).json({
            msg: "Login successful",
            token,
            userId: userExist._id.toString(),
            role: userExist.role
          });
    }catch(error){
        next(error);
    }
}


const logoutUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Extract token from Authorization header
    const token = authorization.split(' ')[1];

    // Decode token to get user ID
    const decodedToken = jwt.decode(token);

    // Revoke token by updating user's token version
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment token version to invalidate previous tokens
    user.tokenVersion += 1;
    await user.save();

    res.status(200).json({ message: 'Logout successful' });
  }  catch (error) {
       next(error);
  }
};




module.exports = {
   registerUser,
   getUsers,
    logoutUser,
    loginUser
};















