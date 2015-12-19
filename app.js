var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//mongoinitialize
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/dbso';
var dbUser = "admin";
var dbPass = "abc123";


dbServer = new mongodb.Server('192.168.0.24',parseInt("27017"));
db = new mongodb.Db("dbso", dbServer, {auto_reconnect: true});



db.open(function(err,db){
	if (err) throw new Error(err);
	else{
		console.log("db connected correctly");
		db.authenticate(dbUser, dbPass, {authdb: "admin"}, function(err, res) { 
			if (err) throw new Error(err);
			else{
				console.log("autenticacion yeah");
			}
		});
	}
});



app.get('/',function(req,res){
	res.send("Hola mundo");
});

app.get('/dbhealth', function (req, res) {
  	db.collection('users').find().toArray(function(err,actividades){
		if (err) { res.end(JSON.stringify({'success':0})); }
		res.end(JSON.stringify(actividades));
	});
});


app.get('/principal', function (req, res)
{
    res.render('index.html');
});

/*

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
*/

io.set('transports', ['websocket']);

contador = 0;
io.sockets.on('connection',function(socket){ 
	socket.on('sumar', function(){
		contador = contador + 1;
		io.sockets.emit('NewConnection',contador);
		//socket.bradcast.emit('new message',data);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
