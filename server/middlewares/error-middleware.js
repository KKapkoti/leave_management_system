//middlewares/error-middleware.js

const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "SERVER ERROR";
    const extraDetails = err.extraDetails || "Error from SERVER";


    return res.status(status).json({message, extraDetails});
};


module.exports = errorMiddleware;



