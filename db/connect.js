// Importing mongoose library to interact with MongoDB
const mongoose = require('mongoose')

// Declaring a function that takes the database URL and connects to MongoDB
const connectDB = (url) => {
    // Optional log for debugging — shows that the function is being called
    console.log('Attempting to connect to the database...')

    // Return the promise from mongoose.connect
    return mongoose
        .connect(url) // Connect using the provided connection string
        .then(() => console.log('Database connected successfully.')) // Log success
        .catch((error) => {
            // Log the error message if connection fails
            console.error('Database connection failed:', error.message)

            // Re-throw the error so it can be caught in app.js or wherever connectDB() is used
            throw error
        })
}

// Exporting the connectDB function so it can be imported in app.js
module.exports = connectDB
