// controllers/adminController.js
const bcrypt = require('bcrypt'); 
const User = require("../models/UserModel");
const LeaveRequest = require('../models/LeaveModel');

//dashboard
const getAdminDashboard = async (req, res, next) => {
    try {
      // Fetch the list of students
      const students = await User.find({ role: 'STUDENT' });
  
      // Fetch the list of HODs
      const hods = await User.find({ role: 'HOD' });

      // Fetch the list of departments
      const departments = await User.distinct('department');
  
      // Fetch the list of leave requests from students
      const leaveRequests = await LeaveRequest.find({});
  
      res.status(200).json({ students, hods, departments, leaveRequests });
    } catch (error) {
      next(error);
    }
  };




//add hod
const addHod = async (req, res, next) => {
  try {
    const { department, name, password, phone, gender, email, dateOfBirth, address, role } = req.body;
    
    // if (role !== 'HOD') {
    //   return res.status(400).json({ message: 'Only HOD can be added by admin' });
    // }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    


    // Hash the password
    const saltRound = 10;
    const hash_Password = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      department,
      name,
      password:hash_Password,
      phone,
      gender,
      email,
      dateOfBirth,
      address,
      role:'HOD',
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    next(error);
  }
};




//get users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};



//get admin profile
const getAdminProfile = async (req, res, next) => {
    try {
      // Assuming admin details are stored in the JWT payload
      const adminDetails = req.user;
      res.status(200).json(adminDetails);
    } catch (error) {
      next(error);
    }
  };




  //approve student leaves
const approveLeave = async (req, res) => {
  try {
    // Update leave request status to 'approved'
    const { leaveId } = req.params;
    await LeaveRequest.findByIdAndUpdate(leaveId, { adminStatus: 'Approved' }); // Updated status field to hodStatus

    res.status(200).json({ message: 'Leave request approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


//reject student leaves
const rejectLeave = async (req, res) => {
  try {
    // Update leave Model status to 'rejected'
    const { leaveId } = req.params;
    await LeaveRequest.findByIdAndUpdate(leaveId, { adminStatus: 'Rejected' });

    res.status(200).json({ message: 'Leave request rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
    getAdminDashboard,
  addHod,
  getUsers,
  getAdminProfile,
  approveLeave,
  rejectLeave
};


