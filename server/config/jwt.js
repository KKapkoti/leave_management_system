//config/jwt.js
console.log("JWT Secret:", process.env.JWT_SECRET);
// console.log("All environment variables:", process.env);
const jwt = require('jsonwebtoken');
const generateToken = async function (user) {
  try{
      return jwt.sign(
        {
            userId: user._id.toString(),
            email: user.email,
            isadmin: user.role === 'HOD' || user.role === 'ADMIN',
        },
         process.env.JWT_SECRET || 'defaultsecret', // Use environment variable or default value
        {
          expiresIn: "30d",
        }
      );
  }catch(e) {
      console.error(e);
      throw e; // Re-throw the error to handle it in the caller function
  }
};




module.exports = {
  generateToken,
};



