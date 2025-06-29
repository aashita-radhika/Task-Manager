// Creating a Mongoose schema for the 'Task' collection
const TaskSchema = new mongoose.Schema({
    // 'name' field must be a non-empty string
    name: {
        type: String,                            // Field type is String
        required: [true, 'must provide name'],   // Field is required with custom error message
        trim: true,                              // Removes whitespace around input
        maxlength: [25, 'name cannot be more than 25 characters'] // Validation limit
    },

    // 'completed' field is a Boolean with a default value of false
    completed: {
        type: Boolean,
        default: false
    }
})
