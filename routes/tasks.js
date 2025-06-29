const express = require('express')
// Importing Express so we can use its Router functionality
const express = require('express')

// Creating a new router instance — this will hold all task-related routes
const router = express.Router()

// Importing controller functions for each route action
const {
    getAllTasks,     // GET all tasks
    createTask,      // POST a new task
    updateTask,      // PATCH (edit) an existing task
    deleteTask,      // DELETE a task
    getTask          // GET a single task by ID
} = require('../controllers/tasks')

// Define routes for base path '/api/v1/tasks'
// GET → fetch all tasks
// POST → create a new task
router.route('/')
    .get(getAllTasks)
    .post(createTask)

// Define routes for path '/api/v1/tasks/:id'
// GET → get a task by ID
// PATCH → update some fields of a task
// DELETE → remove a task
router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask)

// Export the router to be used in app.js
module.exports = router
