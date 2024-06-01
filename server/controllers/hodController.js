//controllers/hodController
const bcrypt = require('bcrypt'); 
const User = require("../models/UserModel");
const LeaveModel = require('../models/LeaveModel');


// Add new student
const addStudent = async (req, res, next) => {
  try {
    console.log('Request body:', req.body);

    // Assuming the data for the new student is sent in the request body
    const { name, password, phone, gender, email, dateOfBirth, address } = req.body;
    

     // Ensure all required fields are present
     if (!name || !password || !phone || !gender || !email || !dateOfBirth || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    // Hash the password
    const saltRound = 10;
    const hash_Password = await bcrypt.hash(password, saltRound);


    // Create the new student object
    const newStudent = new User({
      department: req.user.department, // Use HOD's department
      name,
      password:hash_Password,
      phone,
      gender,
      email,
      dateOfBirth,
      address,
      role: 'STUDENT', // Set role as student
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    next(error);
  }
};


//get department wise students
const departmentStudents = async (req, res) => {
  try {
    // Retrieve students belonging to the HOD's department
    const department = req.user.department; // Assuming department is stored in JWT payload
    const students = await User.find({ role: 'STUDENT', department });

    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Delete a student
const deleteStudent = async (req, res, next) => {
  try {
      const { studentId } = req.params;
      await User.findByIdAndDelete(studentId);
      res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};



// Edit student details
const editStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, phone, gender, email, dateOfBirth, address } = req.body;

    // Find the student by ID and update the details
    await User.findByIdAndUpdate(id, {
      name,
      password, // You may want to hash the new password before updating
      phone,
      gender,
      email,
      dateOfBirth,
      address,
    });

    res.status(200).json({ message: 'Student details updated successfully' });
  } catch (error) {
    next(error);
  }
};


// const leaveRequests = async (req, res,next) => {
//   try {
//     const department = req.user.department; // Assuming department is stored in JWT payload
//     // const studentLeaves = await LeaveRequest.find({ department });
//     const studentLeaves = await LeaveModel.find({ department }).populate('student', 'name'); // Assuming LeaveRequest model has a 'student' field referencing the User model
//     res.status(200).json({ studentLeaves });
//   } catch (error) {
//     next(error);
//   }
// };

const getStudentLeaves = async (req, res, next) => {
  try {
    const department = req.user.department;
    const students = await User.find({ role: 'STUDENT', department });

    const studentIds = students.map(student => student._id); // Uncomment this line if you intend to use 'studentIds'

    const studentLeaves = await LeaveModel.find({ studentId: { $in: studentIds } });
    res.status(200).json({ studentLeaves });
  } catch (error) {
    next(error);
  }
};


//approve student leaves
const approveLeave = async (req, res) => {
  try {
    // Update leave request status to 'approved'
    const { leaveId } = req.params;
    await LeaveModel.findByIdAndUpdate(leaveId, { hodStatus: 'Approved' }); // Updated status field to hodStatus

    res.status(200).json({ message: 'Leave request approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


//reject student leaves
const rejectLeave = async (req, res) => {
  // try {
  //   // Update leave Model status to 'rejected'
  //   const { leaveId } = req.params;
  //   await LeaveModel.findByIdAndUpdate(leaveId, { hodStatus: 'Rejected' });

  //   res.status(200).json({ message: 'Leave request rejected successfully' });
  // } catch (error) {
    try {
      const { leaveId } = req.params;
      const leaveRequest = await LeaveModel.findById(leaveId);
  
      const student = await User.findById(leaveRequest.studentId);
      if (student.department !== req.user.department) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }
  
      await LeaveModel.findByIdAndUpdate(leaveId, { hodStatus: 'Rejected' });
      res.status(200).json({ message: 'Leave request rejected successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




//dashboard
const getHodDashboard = async (req, res, next) => {
  try {
    // Fetch the list of students


    const department = req.user.department; // Assuming department is stored in JWT payload
    const students = await User.find({ role: 'STUDENT', department });



    // Fetch the list of leave requests from students
    const leaveModel = await LeaveModel.find({});

    res.status(200).json({ students, leaveModel });
  } catch (error) {
    next(error);
  }
};



module.exports ={
  addStudent,
  departmentStudents,
  deleteStudent,
  editStudent,
  getStudentLeaves,
  approveLeave,
  rejectLeave,
  getHodDashboard,
}
