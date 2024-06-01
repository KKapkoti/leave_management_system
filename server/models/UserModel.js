// models/UserModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // departmentId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Department",
    //     required: true,
    //   },
    department:{
      type: String,
      required: true,
      enum: ["C.S.E", "Civil", "Mechanical", "AI&ML", "Robotics & Automation"],
    },
      name:{
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      gender: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: (prop) => `Invalid Email Address: ${prop.value}`,
        },
      },
      dateOfBirth: {
        type: Date, //chance type of date
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        enum: ["STUDENT", "HOD", "ADMIN"],
        // default: "STUDENT",
      },
      // Image: {
      //   type: String,
      //   required: true,
      // },
    publishedDate: {type:Date, default: Date.now()},
  },
    { versionKey: false, timestamps: true },
);



const User = mongoose.model('User', userSchema);
module.exports = User;


