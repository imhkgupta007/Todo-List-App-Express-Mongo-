// Require the express
const express = require('express');

// PORT NUMBER AT WHICH OUR SERVER WILL BE RUNNING
const port = 9000;

// CREATE OBJECT FOR EXPRESS
const app = express();

// CREATE TO THE DATABASE
const db = require('./config/mongoose');

// IMPORT THE TODO OBJECT FROM MODELS
const todosModel = require('./models/todos');

// USING EJS AS TEMPLE ENGINE
app.set('view engine', 'ejs');

// SET THE PATH OF VIEWS DIRECTORY
app.set('views', './views');

// FOR DECODING URL
app.use(express.urlencoded());

// USE THE CSS AND JAVASCRIPT FILE
app.use(express.static('assets'));

// OLD TODOLIST SCHEMA USED WHEN MODEL WASN'T DEFINED
/* var todoList = [{
    description: null,
    category: null,
    dueDate: null
}]; */

// THIS IS HOME PAGE URL USING GET REQUEST
app.get('/', function (req, res) {

    todosModel.find({}, function(err, todosModel) {
        if (err) {
            console.log('Error found in database fetching');
            return;
        }
        return res.render('home',
        {
            title: 'My Todo List',
            todoList : todosModel
        });
    });
});

// FOR CREATING A NEW TASK
app.post('/create-todo', function(req, res) {

    todosModel.create({
        description : req.body.description,
        category : req.body.category,
        dueDate : req.body.dueDate
    }, function(err) {
        if (err) {
            console.log('Error in creating a Todo');
            return;
        }
        return res.redirect('/');
    });
});

// TO DELETE A SINGLE TASK USING CROSS BUTTON
app.get('/delete-todo-single', function(req, res) {
    let id = req.query.id;

    todosModel.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('Error in deleting a Todo');
            return;
        }
        return res.redirect('/');
    });
});

// TO DELETE TASK(S) USING DELETE BUTTON USING CHECKBOX
app.post('/delete-todo', function(req, res) {
    let ids = req.body.checkboxId;
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        todosModel.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("Eror in deleting a todo"); 
                return; 
            }
        });
    } else {    // if multiple task is to be deleted
        for(let id of ids) {
            todosModel.findByIdAndDelete(id, function(err) {
                if(err) {
                    console.log('Error in deleting with delete button');
                    return;
                }
            });
        }
    }
    return res.redirect('/');
});

// FIRE UP SERVER
app.listen(port, function(err) {
    if (err) {
        console.log(`Error: ${err}`);
    }
    console.log(`Server up and running on port: ${port}`);
});