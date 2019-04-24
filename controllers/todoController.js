var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var data = [{item: 'Item 1'}, {item: 'Item 2'}, {item: 'Item 3'}];

//middleware that we run in the POST request
var urlencodedParser = bodyParser.urlencoded({extended: false});

require('dotenv').config();

//Connect to the database
// mongoose.connect('mongodb://test:test@ds017195.mlab.com:17195/todo');
var mongoDatabase= 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASSWORD + '@ds028310.mlab.com:28310/test-azure'
console.log(mongoDatabase);

//Create a schema - this is like a blueprint - what kind of info MangoDB to expect from our todo data
var todoSchema = new mongoose.Schema({
    item: String
});

//Create a module based on schema
var Todo = mongoose.module('Todo', todoSchema);

// create an item, our collection
var itemOne = Todo({item: 'task - from MongoDB'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});

//exports a function
module.exports = function(app){
    app.get('/todo', function(req, res){
        // res.render('todo', {todos: data});

        //get data from mongo db and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // data.push(req.body);
        // res.json(data);

        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo:item', function(req, res){
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);

        //detele the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
}