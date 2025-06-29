// Importing the Task model from Mongoose schema
const Task = require('../models/task')

// Custom async wrapper to avoid repetitive try-catch in every function
const asyncWrapper = require('../middleware/async')

// Custom error creator that returns an error object with message and status code
const { createCustomError } = require('../errors/custom-error')


// GET all tasks (READ)
const getAllTasks = asyncWrapper(async (req, res) => {
    // Fetches all tasks from MongoDB using Mongoose
    const tasks = await Task.find({})
    // Sends response with 200 status and tasks array
    res.status(200).json({ tasks })
})


// POST a new task (CREATE)
const createTask = asyncWrapper(async (req, res) => {
    // Creates a new task using data from req.body
    const task = await Task.create(req.body)
    // Sends back the created task with 201 status (resource created)
    res.status(201).json({ task })
})


// GET a single task by ID (READ)
const getTask = asyncWrapper(async (req, res, next) => {
    // Destructuring ID from request parameters
    const { id: taskID } = req.params
    // Finds the task by its MongoDB _id field
    const task = await Task.findOne({ _id: taskID })
    
    // If task doesn't exist, send to custom error handler
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    // Send back the found task with 200 status
    res.status(200).json({ task })
})


// DELETE a task by ID (DELETE)
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params

    // Finds the task and deletes it from MongoDB
    const task = await Task.findOneAndDelete({ _id: taskID })

    // If task not found, return 404
    if (!task) {
        return res.status(404).json({ msg: `No task with ID : ${taskID}` })
    }

    // If deletion successful, return success message
    res.status(200).json({ task: null, status: 'success' })
})


// PATCH update (or PUT) a task by ID (UPDATE)
const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params

    // Updates task by ID with req.body fields
    const task = await Task.findOneAndUpdate(
        { _id: taskID },    // filter
        req.body,           // update fields
        {
            new: true,         // return updated task instead of old one
            runValidators: true // run schema validators (like required fields)
        }
    )

    // If task doesn't exist, handle with custom error
    if (!task) {
        return next(createCustomError(`No task with ID : ${taskID}`, 404))
    }

    // Return updated task
    res.status(200).json({ task })
})


// Exporting all controller functions to be used in routes
module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    getTask,
    updateTask,
}
