class CustomAPIError extends Error {
    constructor(message, statusCode) {
        // Call the parent constructor with the error message
        super(message)
        // Add a custom property to store the HTTP status code
        this.statusCode = statusCode
    }
}

// A helper function to create and return a new CustomAPIError instance
const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

// Export both the class and the helper function
module.exports = { createCustomError, CustomAPIError }
