//controllers/leaveController


const LeaveModel = require('../models/LeaveModel');


const applyLeave = async (req, res, next) => {
  try {
    // Extract leave details from request body
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication token is missing or invalid' });
    }
    const { leaveType, leaveDetails, startLeaveDate, endLeaveDate, numOfDays } = req.body;
    // const studentId = req.user.userId;
    const studentId = req.user._id;


    // Create new leave request
    const newLeaveRequest = new LeaveModel({
      studentId,
      leaveType,
      startLeaveDate,
      endLeaveDate,
      leaveDetails,
      numOfDays,
    });

    await newLeaveRequest.save();

    res.status(201).json({ message: 'Leave request submitted successfully' });
  } catch (error) {
    next(error);
  }
};

const leaveStatus = async (req, res, next) => {
  try {
    // Retrieve leave requests for the authenticated student
    const studentId = req.user._id; // Assuming userId is stored in JWT payload
    // const Leave = await Leave.find({ studentId });
    // const leaves = await Leave.find({ studentId });
    // const userLeave = await LeaveModel.find({ studentId });

      const userLeave = await LeaveModel.find({ studentId }).populate('studentId', 'name');


    // res.status(200).json({ leaves });
    res.status(200).json({ userLeave });
  } catch (error) {
    next(error);
  }
};



module.exports = {
   applyLeave,
   leaveStatus 
}




