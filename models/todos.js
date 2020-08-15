// Require mongoose library
const mongoose = require('mongoose');

// Defining a Schema for Todos
const todosSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    dueDate : {
        type: String,
        required: true
    }
});

// Declaring schema as a model
const todosModel = mongoose.model('todosModel', todosSchema);

// Exporting Model for Todos
module.exports = todosModel;