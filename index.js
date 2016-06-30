var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var MongoClient = mongodb.MongoClient;

// connect to DB
mongoose.connect('mongodb://localhost:27017/debates_db');


// create chat schema
var Schema = mongoose.Schema;
var chatSchema = new Schema({
	ID: Number,
	topic: String,
	debaters: {debater_1: Number, debater_2: Number},
	debate_log_1: String,
	debate_log_2: String,
	comments: String
});

var Chat = mongoose.model('Chat', chatSchema);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res) {
	res.sendFile(__dirname + '/chat.html');
});

/////////////////////////////////////////////////////
/// protocol for connecting to chat rooms ///////////
/////////////////////////////////////////////////////
io.on('connect', function(socket) {

/////////////////////////////////////////////////////

	socket.on('create_room', function(name) {
		// Chat.remove({}, function(err) {
		// 	//console.log(err);
		// });

		Chat.findOne({}).sort('-ID').exec(function(err, res) { //find max existing ID
			id = res.ID;
			if (id == null) id = 1;
			else id+=1;
			socket.join(id); // assign socket to new chat room
			console.log(id);
			var info = {
				ID: id, 
				topic: undefined, 
				debaters: undefined, 
				debate_log_1: undefined, 
				debate_log_2: undefined,
				comments: undefined 
				};
			chat = new Chat(info);
			chat.save();
		});

	});

/////////////////////////////////////////////////////
	socket.on('join_as_debater', function(name){
		/// stuff stuff
		var player = 'player2';
		socket.emit('connected to '+ name + ' as '+player);
	});
/////////////////////////////////////////////////////
	socket.on('join_as_commentator', function(name){
		/// stuff stuff
		socket.emit('connected to '+ name + ' as commentator');
	});

});


http.listen(3000,function(){
	console.log('listening on *:3000');
});


// DB OPERATIONS


// // Use connect method to connect to the Server

// MongoClient.connect(url, function (err, db) {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     //HURRAY!! We are connected. :)
//     console.log('Connection established to', url);

//     var chat_rooms = db.collection('chat_rooms');
		
//     //Close connection
//     db.close();
//   }
// });