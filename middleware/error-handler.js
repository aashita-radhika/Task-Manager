// Importing the custom error class
const { CustomAPIError } = require('../errors/custom-error')

// Error-handling middleware function (has 4 parameters)
const errorHandlerMiddleware = (err, req, res, next) => {
    // If the error was thrown using our custom class, use its status code and message
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    // Otherwise, return a generic 500 error
    return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

// Export the middleware to be used in app.js
module.exports = errorHandlerMiddleware
