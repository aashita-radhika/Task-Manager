// asyncWrapper takes in an async function (your controller) and returns a new function
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            // Execute the passed controller and await its result
            await fn(req, res, next)
        } catch (error) {
            // If there's an error, pass it to Express error handling middleware
            next(error)
        }
    }
}

// Exporting the wrapper to use in controllers
module.exports = asyncWrapper
