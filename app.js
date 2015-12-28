var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.set('transports', ['websocket']);

contador = 0;
io.sockets.on('connection',function(socket){ 
	socket.on('sumar', function(){
		contador = contador + 1;
		io.sockets.emit('NewConnection',contador);
		//socket.bradcast.emit('new message',data);
	});

	setInterval(function(){
		db.collection('tweets').find({},{limit:10}).toArray(function(err,tweets){
		if(err){}else{
			console.log("emitiendo tweets");
			socket.emit('tweets',tweets);
		}
	});
	},10000);
	

	socket.on('nuevotweet', function(tweet){
		io.sockets.emit('NewConnection',tweet);
		//socket.bradcast.emit('new message',data);
	});

});


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));

//mongoinitialize
var mongodb = require('mongodb');
var mongojs = require('mongojs');
var dbUser = "admin";
var dbPass = "abc123";

/*
var db = mongojs('mongodb://92.168.122.11:27017,192.168.122.10:27017/dbso',['users']);

db.on('error', function (err) {
    console.log('database error', err);
});
db.on('connect', function () {
    console.log('database connected');
}); */



dbServer1 = new mongodb.Server('192.168.2.31',parseInt("27017"));
dbServer2 = new mongodb.Server('192.168.2.32',parseInt("27017"));
repl = new mongodb.ReplSet([dbServer1],{
	rs_name         : "rs0", //the name of the replicaset to connect to.
    ha              : true, //turn on high availability --> I still have to test this, but so far its looking promising.
    haInterval      : 2000, //time between each replicaset status check
    reconnectWait   : 5000, //time to wait in miliseconds before attempting reconnect
    retries         : 1000, //number of times to attempt a replicaset reconnect. // --> how do I set this to unlimited?
    readPreference  : mongodb.Server.READ_SECONDARY, //the prefered read preference (Server.READ_PRIMARY, Server.READ_SECONDARY, Server.READ_SECONDARY_ONLY)
    poolSize        : 4 //default poolSize for new server instances --> how do I determine the optimal pool size?
});

db = new mongodb.Db('dbso', repl,{auto_reconnect:true});
//db = new mongodb.Db("dbso", dbServer, {auto_reconnect: true});


db.open(function(err,db){
	if (err) throw new Error(err);
	else{
		console.log("db connected correctly");
		
	}
}); 



app.get('/health',function(req,res){
	res.send("Hola mundo");
});

app.get('/dbhealth', function (req, res) {
  	db.collection('users').find().toArray(function(err,actividades){
		if (err) { res.end(JSON.stringify({'success':0, err:err})); }
		res.end(JSON.stringify(actividades));
	});
});

app.get('/insert/usr/:usr/txt/:txt', function (req, res) {
	var tweet = {user:req.params.usr,txt:req.params.txt};
	db.collection('tweets').insert(tweet,function(err, records){
      if (err) { res.end(JSON.stringify({'success':0})); }
      res.end(JSON.stringify({'success':1}));
    });
    io.sockets.emit('nuevotweet',tweet);
});


app.get('/', function (req, res)
{
    res.render('index.html');
});

app.get('/prueba', function (req, res)
{
    res.render('prueba.html');
});

/*

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
*/



http.listen(3000, function(){
  console.log('listening on *:3000');
});
