//models/LeaveModel.js

const {model, Schema } = require("mongoose");

const leaveSchema = new Schema ({
     studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      // name:{
      //   type: Schema.Types.ObjectId,
      //   ref: "studentId",
      //   required: true,
      // },
      leaveType: {
        // type: Schema.Types.ObjectId,
        // ref: "LeaveType",
        type: String,
        required: true,
      },
      leaveDetails: {
        type: String,
        required: true,
      },
      startLeaveDate: {
        type: Date,
        // default: Date.now,
        required: true,
      },
      endLeaveDate: {
        type: Date,
        required: true,
      },
      numOfDays: {
        type: Number,
        required: true,
      },
      adminRemark: {
        type: String,
        default: "",
      },
      hodRemark: {
        type: String,
        default: "",
      },
      adminStatus: {
        type: String,
        enum: ["Pending", "Rejected", "Approved"],
        default: "Pending",
      },
      hodStatus: {
        type: String,
        enum: ["Pending", "Rejected", "Approved"],
        default: "Pending",
      },
    },
    { timestamps: true, versionKey: false },
  );


  
const Leave = new model("Leave", leaveSchema);
module.exports = Leave;



