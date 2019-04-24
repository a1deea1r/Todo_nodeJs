var express = require('express');
var app = express();
//store the function exported from todoController
var todoController = require('./controllers/todoController.js');

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static(__dirname + './public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('Listening to port 3000');
