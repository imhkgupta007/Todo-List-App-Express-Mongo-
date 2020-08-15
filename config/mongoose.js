// Require the library
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/todoList_db');

// Acquire the connection
const db = mongoose.connection;

// Error Case
db.on('error', console.log.bind(console,'Error Connecting to db'));

// Working Case
db.once('open', () => console.log('Successfully Connected to Server'));