var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/my_database_name';


///////////// how to reach index page////////////////
/////////////////////////////////////////////////////
app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


<<<<<<< HEAD
// CONNECTING VIA SOCKET

=======
/////////////////////////////////////////////////////
/// protocol for connecting to chat rooms ///////////
/////////////////////////////////////////////////////
>>>>>>> 03ac423054f073bff2c184bfb6804d471eb09602
io.on('connection', function(socket){
/// room to connect to
/// stage or comment channel 
	console.log('bingo');

/////////////////////////////////////////////////////
	socket.on('make room', function(name){
		/// stuff happens here
		var player = 'player1';
		socket.emit('connected to ' + name + ' as '+player);
	});
/////////////////////////////////////////////////////
	socket.on('join as debater', function(name){
		/// stuff stuff
		var player = 'player2';
		socket.emit('connected to '+ name + ' as '+player);
	});
/////////////////////////////////////////////////////
	socket.on('join as comentator', function(name){
		/// stuff stuff
		socket.emit('connected to '+ name + ' as commentator');
	});
/////////////////////////////////////////////////////
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


http.listen(3000,function(){
	console.log('listening on *:3000');
});

// DB OPERATIONS

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});