angular.module('services',[])

.factory('$socket',function(socketFactory){
	var socket = io.connect("http://192.168.2.30:3000",{transports: ["websocket"]});
	mySocket = socketFactory({
		ioSocket: socket
	});
	return mySocket;
});