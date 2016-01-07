var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.set('transports', ['websocket']);

contador = 0;
var type = 0;
var value = "";

io.sockets.on('connection',function(socket){ 
	socket.on('sumar', function(){
		contador = contador + 1;
		io.sockets.emit('NewConnection',contador);
		//socket.bradcast.emit('new message',data);
	});

	setInterval(function(){
		db.collection('tweets').find({},{sort: [['_id','descending']],limit:10}).toArray(function(err,tweets){
			if(err){console.error(err);}else{
				socket.emit('tweets',tweets);
			}
		});

		db.collection('tweets').aggregate([{$group: {_id:"$user", count:{$sum:1}}},{$sort:{count:-1}}, {$limit:1}])
		.toArray(function(err,resultado){
			if(err){}else{
				socket.emit('usermax',resultado[0]);
			}
		});

		db.collection('tweets').aggregate([{$group: {_id:"$categoria", count:{$sum:1}}},{$sort:{count:-1}}, {$limit:1}])
		.toArray(function(err,resultado){
			if(err){}else{
				socket.emit('categoriamax',resultado[0]);
			}
		});

		db.collection('tweets').find({}).count(function(err,count){
			if(err){}else{
				socket.emit('tweetsc',count);
			}
		});

		db.collection('tweets').distinct('user',function(err,docs){
			if(err){}else{
				socket.emit('usersc',docs.length);
			}
		});

		db.collection('tweets').distinct('categoria',function(err,docs){
			if(err){}else{
				socket.emit('categoriasc',docs.length);
			}
		});

	},7000);

	setInterval(function(){
		if(type!= 0){
			if(type==1){
				db.collection('tweets').find({user:value},{sort: [['_id','descending']],limit:10}).toArray(function(err,tweets){
					if(err){}else{
						socket.emit('tweetsf',tweets);
					}
				});
			}else{
				db.collection('tweets').find({categoria:value},{sort: [['_id','descending']],limit:10}).toArray(function(err,tweets){
					if(err){}else{
						socket.emit('tweetsf',tweets);
					}
				});
			}
		}
	},7000);
	
	socket.on('searchTweets',function(tipo, valor){
		value = valor;
		type = tipo;
	});

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

//servers
dbServer1 = new mongodb.Server('192.168.2.31',parseInt("27017"), {auto_reconnect:true});
dbServer2 = new mongodb.Server('192.168.2.32',parseInt("27017"), {auto_reconnect:true});
repl = new mongodb.ReplSet([dbServer1,dbServer2],{
	rs_name         : "rs0", //the name of the replicaset to connect to.
    ha              : true, //turn on high availability --> I still have to test this, but so far its looking promising.
    haInterval      : 1000, //time between each replicaset status check
    reconnectWait   : 1000, //time to wait in miliseconds before attempting reconnect
    retries         : 30, //number of times to attempt a replicaset reconnect. // --> how do I set this to unlimited?
    readPreference  : mongodb.Server.NEAREST, //the prefered read preference (Server.READ_PRIMARY, Server.READ_SECONDARY, Server.READ_SECONDARY_ONLY)
    poolSize        : 4 ,//default poolSize for new server instances --> how do I determine the optimal pool size?
    socketOptions 	: {	
    	connectTimeoutMS: 1000,
    	keepAlive: 1,
    	socketTimeoutMS: 1000
    }
});

db = new mongodb.Db('dbso', repl ,{w:0, auto_reconnect:true,native_parser:true, slaveOk: true});
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

app.get('/insert', function (req, res) {
	var user = req.query.usr;
	var nombre = req.query.nom;
	var txt = req.query.txt;
	
	var categoria = "";
	if(req.query.txt){
		var tmp1 = req.query.txt.split("$");
		if(tmp1.length>1){
			var tmp2 = tmp1[1].split(' ');
			if(tmp2.length>0){
				categoria = tmp2[0];
				var tweet = {user:user,nombre:nombre,txt:txt,categoria:categoria};
			}else{
				var tweet = {user:user,nombre:nombre,txt:txt};
			}
		}else{
			var tweet = {user:user,nombre:nombre,txt:txt};
		}
	}
	
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
