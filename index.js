var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/my_database_name';

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// CONNECTING VIA SOCKET

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	io.on('connection', function(socket){
		socket.on('chat message', function(msg){
			io.emit('chat message', msg);
		});
	});
});

http.listen(3000, function(){
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