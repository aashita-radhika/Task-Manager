// Importing Express and creating the app instance
const express = require('express')
const app = express()

// Importing the task routes
const tasks = require('./routes/tasks')

// Function to connect to MongoDB
const connectDB = require('./db/connect')

// Loads environment variables from .env file into process.env
require('dotenv').config()

// Middleware to handle unknown routes and errors
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Serve static files from 'public' folder (HTML, CSS, JS, images)
app.use(express.static('./public'))

// Parse incoming JSON requests into req.body
app.use(express.json())
// Optional homepage route (for browser entry)
app.get('/', (req, res) => {
    // Sends index.html file as a response for root URL
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Mount all task routes at /api/v1/tasks
// For example: GET /api/v1/tasks, POST /api/v1/tasks, etc.
app.use('/api/v1/tasks', tasks)

// Middleware for unmatched routes (404 handler)
app.use(notFound)

// Centralized error handling middleware
app.use(errorHandlerMiddleware)

// Set port from environment variable, fallback to 3000 if not defined
const port = process.env.PORT || 3000

// Start the server only after successful DB connection
const start = async () => {
    try {
        // Connect to MongoDB using MONGO_URI from .env
        await connectDB(process.env.MONGO_URI)

        // Start server after DB connects
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        // Catch and log any startup errors
        console.log(error)
    }
}

start() // Call the async startup function

