var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


///////////// how to reach index page////////////////
/////////////////////////////////////////////////////
app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


/////////////////////////////////////////////////////
/// protocol for connecting to chat rooms ///////////
/////////////////////////////////////////////////////
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